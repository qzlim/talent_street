const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
},{collection : 'user'});

const user = mongoose.model('user', userSchema);

module.exports = user;
