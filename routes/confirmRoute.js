const express = require('express');
const router = express.Router();
const Subcategory = require('../models/subcategory');
const Teacher = require('../models/teacher');
const Booking = require('../models/booking');

const requireBookingData = (req, res, next) => {
    if (req.session.hasBooking) {
        next();
    } else {
        res.redirect('/');
    }
};

router.get('/', requireBookingData, async (req, res) => {
    try {
        req.session.hasBooking = false;
        const isLoggedIn = req.session.user;
        const bookingData = req.session.bookingData;
        const time = bookingData.time;
        const date = bookingData.date;
        const duration = bookingData.duration;
        const price = bookingData.price;
        const lessonID = bookingData.lesson_id;
        const subcategory = await Subcategory.findOne({ name: bookingData.subcategory });
        const teacher = await Teacher.findOne({ name: bookingData.teacher });

        const userID = isLoggedIn._id;
        const subID = subcategory._id;
        const teacherID = teacher._id;

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        const formattedDateString = formattedDate.toString();
        const datebooked = formattedDateString;
        const newBooking = new Booking({ userID, teacherID, subID, lessonID, date, time, duration, price, datebooked });
        newBooking.save()

        res.render('confirmbooking.ejs', { isLoggedIn, bookingData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;