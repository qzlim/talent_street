const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userID: String,
    teacherID: String,
    subID: String,
    lessonID: String,
    date: String,
    time: String,
    duration: String,
    price: String,
    datebooked: String
}, { collection: 'booking' });

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;