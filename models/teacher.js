const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  _id: String,
  name: String,
  gender: String,
  experience: String
}, {collection : 'teacher'});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;