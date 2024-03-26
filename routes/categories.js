const express = require('express');
const router = express.Router();
const {deleteCategory,newcategory,updatecategory,categorybyid,categorylist}=require('../Controller/categoryController')

router.route(`/`).get(categorylist)
router.route('/:id').get(categorybyid)
router.route('/').post(newcategory)
router.route('/:id').put(updatecategory)
router.route('/:id').delete(deleteCategory)

module.exports =router;