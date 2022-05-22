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
      },
    ],
    // address: String,
    // numberPhone: String,
    // totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const productPromise = this.products.map(async (item) => {
    const product = await Product.findById(item.idProduct);
    const { price } = product;
    const totalAmount = item.quantity * price;
    return {
      idProduct: item.id,
      name: product.name,
      quantity: item.quantity,
      totalAmount: totalAmount,
    };
  });

  this.products = await Promise.all(productPromise);
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
