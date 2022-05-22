const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');
const APIFeatures = require('../utils/apiFeature');

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
