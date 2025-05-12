

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addOnSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  addOns: [addOnSchema]
});

const orders = mongoose.model('orders', orderSchema);

module.exports = orders;
