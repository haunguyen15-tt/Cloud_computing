const express = require('express');
const categoryController = require('../controller/categoryController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategorys)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.addNewCategory
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.updateCategory
  );

module.exports = router;
