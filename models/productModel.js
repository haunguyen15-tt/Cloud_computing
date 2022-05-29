const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    comment: [String],
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Product price must be a positive number'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'A product must have a category'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A product must have a image'],
      default: 'default.jpg',
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });

  next();
});

// DOCUMENT MIDDLEWARE: run before .save() and .create()
// productSchema.pre('save', function () {
//   console.log(this);
// });

// // QUERY MIDDLEWARE:
// productSchema.pre('find', function (next) {
//   console.log(this);
//   next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
