const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        // minlength: [8, 'Password must be at least 8 characters long'],
        // validate: {
        //     validator: function(v) {
        //         return /@!#/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid password. Password must contain alphanumeric characters with only @, !, and # as special characters.`,
        // },
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    pincode :{
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('User', userSchema)