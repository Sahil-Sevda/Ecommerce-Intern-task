const Order = require('../Models/order');
const cart = require('../Models/cart');
const { errorhandler, successhandler } = require('./responseHandler')

/**
 * Retrieves a list of all orders.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const allorders=async (req, res,next) =>{
    try{
        const orderList = await Order.find().populate('user', 'name')

    if(!orderList) {
        return next(errorhandler('no order found',500))
    } 
    res.send(orderList);
    }catch(error){
        next(errorhandler(error.message, 500))

    }
    
}
/**
 * Retrieves an order by its ID.
 * @param {Object} req The request object containing the order ID.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const orderbyid= async (req, res,next) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    if(!order) {
        return next(errorhandler('no order of this id found',500))
    } 
    res.send(order);
}

/**
 * Adds a new order.
 * @param {Object} req The request object containing order details.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const addorder=async (req,res,next)=>{
    const cartsIds = Promise.all(req.body.carts.map(async (cart) =>{
        let newcart = new cart({
            quantity: cart.quantity,
            product: cart.product
        })
        // "carts" : [
        //     {
        //         "quantity": 1,
        //         "product" : "abcd"
        //     },
        //     {
        //         "quantity": 2,
        //         "product" : "abcde"
        //     }
        // ],
        newcart = await newcart.save();

        return newcart._id;
    }))
    const cartsIdsResolved =  await cartsIds;

    const totalPrices = await Promise.all(cartsIdsResolved.map(async (cartId)=>{
        const cart = await cart.findById(cartId).populate('product', 'price');
        const totalPrice = cart.product.price * cart.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        carts: cartsIdsResolved,
        shippingAddress: req.body.shippingAddress,
        pincode: req.body.pincode,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        paymentMethod:req.body.method,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if(!order)
    return next(errorhandler('the order cannot be created',400))

    res.send(order);
}

/**
 * Updates the status of an order.
 * @param {Object} req The request object containing the order ID and updated status.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const updatestatus=async (req, res,next)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return next(errorhandler('the order cannot be updated',400))

    res.send(order);
}

/**
 * Retrieves orders of a specific user.
 * @param {Object} req The request object containing the user ID.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const userorders=async (req, res,next) =>{
    const userOrderList = await Order.find({user: req.params.userid})

    if(!userOrderList) {
    return next(errorhandler('no orders found',500))
    } 
    res.send(userOrderList);
}

const totalsales=1;

/**
 * Retrieves the total number of orders.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The next middleware function.
 */
const totalOrdersOfUser=async (req, res,next) =>{
    const orderCount = await Order.countDocuments((count) => count)

    if(!orderCount) {
        return next(errorhandler('0 count',500))

    } 
    res.send({
        orderCount: orderCount
    });
}

module.exports={userorders,totalOrdersOfUser,updatestatus,addorder,orderbyid,allorders}