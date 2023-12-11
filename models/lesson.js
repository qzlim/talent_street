const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  _id: String,
  teacher: String,
  subcategory: String,
  price: Number,
  description: String,
  rating: Number,
  level: String,
  location: String
},{collection : 'lesson'});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
