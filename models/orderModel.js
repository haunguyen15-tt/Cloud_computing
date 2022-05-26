const mongoose = require('mongoose');
const Product = require('./productModel');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    products: [
      {
        idProduct: String,
        name: String,
        quantity: Number,
        totalAmount: Number,
        imageCover: String,
      },
    ],
    address: String,
    numberPhone: String,
    totalAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered'],
      default: 'pending',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const productPromise = this.products.map(async (item) => {
    const product = await Product.findById(item.idProduct);
    const { quantity } = product;
    await Product.findByIdAndUpdate(item.idProduct, {
      quantity: quantity - item.quantity,
    });
    const { price } = product;
    const totalAmount = item.quantity * price;
    return {
      idProduct: item.id,
      name: product.name,
      quantity: item.quantity,
      totalAmount: totalAmount,
      imageCover: product.imageCover,
    };
  });

  this.products = await Promise.all(productPromise);
  this.totalAmount = this.products.reduce(
    (total, item) => total + Math.round(item.totalAmount),
    0
  );
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
