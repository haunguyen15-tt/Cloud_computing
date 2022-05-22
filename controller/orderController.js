const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orderModel');

exports.addNewOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  });
});
