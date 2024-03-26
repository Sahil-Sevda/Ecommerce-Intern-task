const express = require('express');
const router = express.Router();
const {userorders,totalOrdersOfUser,updatestatus,addorder,orderbyid,allorders}=require('../Controller/orderController')

router.route(`/`).get(allorders)
router.route(`/:id`).get(orderbyid)
router.route('/').post(addorder)
router.route('/:id').put(updatestatus)
// router.route('/totalsales',totalsales)
router.route(`/userorders/:userid`).get(userorders)
router.route(`/count`).get(totalOrdersOfUser)

module.exports =router;