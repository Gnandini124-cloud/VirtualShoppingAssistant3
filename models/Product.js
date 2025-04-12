// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  color: String,
  price: Number,
  imageUrl: String // optional
});

module.exports = mongoose.model("Product", ProductSchema);
