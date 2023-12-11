const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Subcategory = require('../models/subcategory');
const Teacher = require('../models/teacher');

router.get('/', async (req, res) => {
    try {
        const isLoggedIn = req.session.user;
        const userID = isLoggedIn._id;

        const page = parseInt(req.query.page) || 1;

        const perPage = 10;
        const skip = (page - 1) * perPage;

        const bookings = await Booking.find({ userID: userID })
            .sort({ datebooked : -1 })
            .limit(perPage)
            .skip(skip);

        const subcategoryNames = [];
        const teacherNames = [];

        for (const booking of bookings) {
            const subcategory = await Subcategory.findOne({ _id : booking.subID});
            const teacher = await Teacher.findOne({ _id : booking.teacherID});
            if (subcategory && teacher) {
                
                subcategoryNames.push(subcategory.name);
                teacherNames.push(teacher.name);
            }
        }
        
        console.log(bookings)

        res.render('profile.ejs', { isLoggedIn, bookings, subcategoryNames, teacherNames, currentPage: page, perPage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
