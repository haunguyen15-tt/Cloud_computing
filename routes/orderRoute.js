const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router.route('/').post(orderController.addNewOrder);

module.exports = router;
