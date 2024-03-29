const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// And it to the post handler stack

router
  .route('/top-5-cheap')
  .get(productController.getTop5Cheap, productController.getAllProducts);

router.route('/product-stats').get(productController.getProductStats);
// router
//   .route('/monthly-plan/:year')
//   .get(productController.getMonthlyPlan);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.uploadImageCover, productController.addNewProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  )
  .patch(productController.uploadImageCover, productController.updateProduct);

router
  .route('/comments/:id')
  .post(productController.createComment)
  .get(productController.getAllComments);

module.exports = router;
