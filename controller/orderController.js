const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const APIFeatures = require('../utils/apiFeature');
const AppError = require('../utils/appError');

exports.addNewOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  // EXCUTE QUERY
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const orders = await features.query;

  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    result: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrdersByUser = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.id });

  console.log(orders);

  if (!orders) {
    return next(new AppError('No orders found with that user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});
