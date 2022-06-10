const Order = require('../models/Order');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
// @desc     Place Order
// @route    POST ==>> /api/orders
// @access   Private
const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({
    orderItems: req.body.orderItems.map((item) => ({
      ...item,
      product: item.id,
    })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });
  res.status(201).json({ message: 'New Order Created', order });
});
// @desc     Get orders for users
// @route    POST ==>> /api/orders/mine
// @access   Private
const getOrdersMine = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders.length < 1) {
    return next(new ErrorResponse(404, 'No orders found for you'));
  }
  res.status(200).json(orders);
});

// @desc     Get Order
// @route    POST ==>> /api/orders/:id
// @access   Private
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (!order) {
    return next(new ErrorResponse(404, 'Order not found'));
  }
  res.status(200).json(order);
});
module.exports = { createOrder, getOrder, getOrdersMine };
