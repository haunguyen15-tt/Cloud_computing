const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router
  .route('/')
  .post(orderController.addNewOrder)
  .get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrdersByUser)
  .patch(orderController.updateOrder);

module.exports = router;
