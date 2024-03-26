const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required:true
    }],
    shippingAddress: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    paymentMethod:{
        type:String,
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Order', orderSchema);



