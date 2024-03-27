const express = require('express');
const router = express.Router();
const { getusers, newuser, updateuser, deleteuser, usercount, login, getuserbyid } = require('../Controller/userController');
const { signUpValidation } = require('../Middleware/validation');
const {authentication} = require('../Middleware/auth');

router.get('/', getusers);
router.post('/', signUpValidation, newuser);
router.get('/:id', getuserbyid);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);
router.post('/login', login);
router.get('/get/count', authentication, usercount);

module.exports = router;
