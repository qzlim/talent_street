const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const { json } = require('body-parser');

const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login?login=havent');
    }
};

router.get('/:booking', requireLogin, async (req, res) => {
    try {
        const isLoggedIn = req.session.user;

        const lessondetails = req.params.booking;
        const lessons = await Lesson.findOne({ _id : lessondetails });
        const teachers = await Teacher.findOne({ _id : lessons.teacher });
        const subcatID = lessons.subcategory;
        const subcategory = await Subcategory.findOne({ _id: subcatID });
        const lesson_id = lessons._id;
        const price = lessons.price;
        const rating = lessons.rating;
        const location = lessons.location;

        if (!subcategory) {
            return res.status(404).send('Subcategory not found');
        }
        const categoryID = subcategory.cat_id;
        const category = await Category.findOne({ _id: categoryID });
        const categoryTitle = category.name;
        const subcategoryTitle = subcategory.name;
        const teacherName = teachers.name;

        res.render('booking.ejs',{ lesson_id, subcategoryTitle , categoryTitle, teacherName, rating, price, location, isLoggedIn});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/set-has-booking', (req, res) => {
    req.session.hasBooking = true;
    req.session.bookingData = req.body;
    res.json({ redirectUrl: '/confirmbooking' });
});

module.exports = router;