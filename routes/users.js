const express = require('express');
const router = express.Router();
const {getusers,newuser,updateuser,deleteuser,usercount,login,getuserbyid}=require('../Controller/userController')

router.route('/').get(getusers)
router.route('/:id').get(getuserbyid)
router.route('/').post(newuser)
router.route('/:id').put(updateuser)
router.route('/login').post(login)
router.route('/:id').delete(deleteuser)
router.route(`/get/count`).get(usercount)


module.exports =router;