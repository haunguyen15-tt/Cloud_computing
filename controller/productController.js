const multer = require('multer');
const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeature');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/img/products');
  },

  filename: (req, file, cb) => {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only image', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImageCover = upload.single('imageCover');

exports.getTop5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,quantity';
  req.query.fields = 'name,price,category,quantity';
  next();
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // EXCUTE QUERY
  const features = new APIFeatures(Product.find(), req.query)
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
});

exports.addNewProduct = catchAsync(async (req, res, next) => {
  const { file } = req;
  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/img/products/`;

  if (!file) {
    return next(new AppError('No image found', 404));
  }

  req.body.imageCover = `${basePath}${fileName}`;

  const newProduct = await Product.create(req.body);

  console.log(req.file);

  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // Tour.findOne({_id : req.params.id  })

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getProductStats = catchAsync(async (req, res, next) => {
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
});

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
