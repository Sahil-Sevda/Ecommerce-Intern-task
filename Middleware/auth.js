const jwt=require('jsonwebtoken');
require('dotenv').config();
const { errorhandler, successhandler } = require('../Controller/responseHandler')

const authentication = async (req, res, next) => {
    try {
        console.log(req.headers.token)
        const token = req.cookies['token']
        const { userId,isAdmin } = jwt.verify(token, process.env.secretkey);
        req.id=userId;
        req.isAdmin=isAdmin;
        next();
    } catch (error) {
        return next(errorhandler(error.message, 401));
    }
};
module.exports={authentication}