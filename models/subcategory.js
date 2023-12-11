const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  _id: String,
  name: String,
  cat_id: String,
  img: String
}, {collection : 'subcategory'});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;

