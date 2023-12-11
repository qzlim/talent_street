const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  lesson: String,
  name: String,
  email: String,
  date: String,
  comment: String
}, {collection : 'review'});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
