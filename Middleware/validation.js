const {check}=require('express-validator')

exports.signUpValidation=[
    check('name','Name is Required').not().isEmpty(),
    check('email','Email is Required').not().isEmpty(),
    check('email','Email format is Required').isEmail(),
    check('password','password is Required').not().isEmpty(),
    check('password','Password length should be >8').isLength({min:8}).custom((value) => {
        if (!/[!@#]/.test(value)) {
            throw new Error('Password must contain at least one special character');
        }
        return true;
    })
]