const Category =require('../Models/categories.js');
const { errorhandler, successhandler } = require('./responseHandler')

/**
 * Retrieves a list of all categories.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const categorylist=async (req, res,next) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        return next(errorhandler('no category found', 500))
    } 
    res.status(200).send(categoryList);
}

/**
 * Retrieves a category by its ID.
 * @param {Object} req The request object containing the category ID.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const categorybyid=async(req,res,next)=>{
    const category = await Category.findById(req.params.id);
    if(!category) {
    return next(errorhandler('The category with the given ID was not found.', 500))
    } 
    res.status(200).send(category);
}

/**
 * Creates a new category.
 * @param {Object} req The request object containing category details.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const newcategory=async (req,res,next)=>{
    let category = new Category({
        name: req.body.name,
        image: req.body.icon,
    })
    category = await category.save();

    if(!category)
    return next(errorhandler('the category cannot be created!', 400))

    res.status(200).send(category);
}

/**
 * Updates a category's information.
 * @param {Object} req The request object containing the category ID and updated data.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const updatecategory=async (req, res,next)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image || category.image,
        },
        { new: true}
    )

    if(!category)
    return next(errorhandler('the category cannot be created!', 400))


    res.status(200).send(category);
}

/**
 * Deletes a category by its ID.
 * @param {Object} req The request object containing the category ID.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const deleteCategory = async (req, res,next) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        
        if (category) {
            return res.status(200).json({ success: true, message: 'The category is deleted!' });
        } else {
            return next(errorhandler("Category not found", 404))
        }
    } catch (err) {
        return next(errorhandler(err.message, 500))
    }
};

module.exports={deleteCategory,newcategory,updatecategory,categorybyid,categorylist}