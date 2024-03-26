const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretkey = process.env.secretkey;
const { errorhandler, successhandler } = require('./responseHandler')

/**
 * This function is used to generate token
 * @param {string} id id is encrypted in token
 * @param {boolean} admin admin tells whether the user have admin control or not
 * @returns token
 */
function generateAccessToken(id, admin) {
	let x = jwt.sign({ userId: id,isAdmin: admin},secretkey,'1d');
	return x;
}

/**
 * Retrieves a list of all users.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const getusers=async (req, res,next) =>{
    const userList = await User.find()

    if(!userList) {
       next(errorhandler('no users present', 500))
    } 
    res.status(200).send(userList);
}

/**
 * Retrieves a user by their ID.
 * @param {Object} req The request object containing the user ID.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const getuserbyid=async(req,res,next)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        next(errorhandler('The user with the given ID was not found.', 500))
    } 
    res.status(200).send(user);
}

/**
 * Creates a new user.
 * @param {Object} req The request object containing user details.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const newuser=async (req,res,next)=>{
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        pincode: req.body.street,
        address: req.body.address,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    next(errorhandler('the user cannot be created!', 400))

    res.send(user);
}

/**
 * Updates a user's information.
 * @param {Object} req The request object containing the user ID and updated data.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const updateuser=async (req, res,next)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword;
    if(req.body.password) {
        let salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(req.body.password, salt);
    } else {
        newPassword = userExist.password;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            password: newPassword
        }
    )

    if(!user)
    next(errorhandler('the user cannot be updated!', 400))

    res.send(user);
}

/**
 * Logs a user in by email and password.
 * @param {Object} req The request object containing user credentials.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const login=async (req,res,next) => {
    try {
		const { email, password } = req.body;
		let obj = await User.findOne({ email: email });
		if (obj) {
			let passwordMatch = await bcrypt.compare(password, obj.password);
			if (passwordMatch) {
				res.status(200).json({ name: obj.name, message: "login successfull", success: true, token: generateAccessToken(obj._id,obj.isAdmin) });
			} else {
                next(errorhandler('invalid password', 400))
			}
		} else {
            next(errorhandler("email does not exist", 404))

		}
	} catch (error) {
        next(errorhandler(error.message, 500))

	}
    
}

/**
 * Deletes a user by their ID.
 * @param {Object} req The request object containing the user ID.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const deleteuser=async (req, res,next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (user) {
            return res.status(200).json({ success: true, message: 'the user is deleted!' });
        } else {
            return next(errorhandler("user not found", 404))
        }
    } catch (err) {
        return next(errorhandler(err.message, 500))
    }
}

/**
 * Retrieves the count of users.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const usercount=async (req, res,next) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        next(errorhandler("empty user list", 500))
    } 
    res.send({
        userCount: userCount
    });
}
module.exports={getusers,newuser,updateuser,deleteuser,usercount,login,getuserbyid}