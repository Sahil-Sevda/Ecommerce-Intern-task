const mongoose = require('mongoose');

const cart = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Cart', cart);