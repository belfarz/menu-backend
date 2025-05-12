

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
});

const orders = mongoose.model('store', orderSchema);

module.exports = orders;
