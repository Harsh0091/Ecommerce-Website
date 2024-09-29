// server/models/Order.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [productSchema],
  totalPrice: { type: Number, required: true },
  orderStatus: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
