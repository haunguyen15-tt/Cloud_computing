const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router
  .route('/')
  .post(orderController.addNewOrder)
  .get(orderController.getAllOrders);

module.exports = router;
