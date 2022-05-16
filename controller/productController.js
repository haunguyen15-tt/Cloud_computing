const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeature');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getTop5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,quantity';
  req.query.fields =
    'name,price,category,quantity';
  next();
};

exports.getAllProducts = catchAsync(
  async (req, res, next) => {
    // EXCUTE QUERY
    const features = new APIFeatures(
      Product.find(),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;

    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      result: products.length,
      data: {
        products,
      },
    });
  }
);

exports.addNewProduct = catchAsync(
  async (req, res, next) => {
    const newProduct = await Product.create(
      req.body
    );

    res.status(201).json({
      status: 'success',
      data: {
        tour: newProduct,
      },
    });
  }
);

exports.getProduct = catchAsync(
  async (req, res, next) => {
    const product = await Product.findById(
      req.params.id
    );
    // Tour.findOne({_id : req.params.id  })

    if (!product) {
      return next(
        new AppError(
          'No product found with that ID',
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  }
);

exports.updateProduct = catchAsync(
  async (req, res, next) => {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return next(
        new AppError(
          'No product found with that ID',
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  }
);

exports.deleteProduct = catchAsync(
  async (req, res, next) => {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return next(
        new AppError(
          'No product found with that ID',
          404
        )
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

exports.getProductStats = catchAsync(
  async (req, res, next) => {
    const stats = await Product.aggregate([
      {
        $match: { price: { $lte: 1000 } },
      },
      {
        $group: {
          _id: '$quantity',
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: -1,
        },
      },
      // {
      //   $match: { _id: { $ne: 400 } },
      // },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  }
);

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = req.params.year * 1;

//     const plan = await Product.aggregate([{}]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         plan,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
