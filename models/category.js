const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  _id: String
}, {collection : 'category'});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

