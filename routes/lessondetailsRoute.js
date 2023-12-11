const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const Review = require('../models/review');

router.get('/:lessondetails', async (req, res) => {
    try {
        const isLoggedIn = req.session.user;

        const lessondetails = req.params.lessondetails;
        const lessons = await Lesson.findOne({ _id : lessondetails });
        const teachers = await Teacher.findOne({ _id : lessons.teacher });
        const subcatID = lessons.subcategory;
        const subcategory = await Subcategory.findOne({ _id: subcatID });
        const lesson_id = lessons._id;
        const description = lessons.description;
        const rating = lessons.rating;
        const price = lessons.price;
        const location = lessons.location;

        if (!subcategory) {
            return res.status(404).send('Subcategory not found');
        }
        const categoryID = subcategory.cat_id;
        const category = await Category.findOne({ _id: categoryID });
        const categoryTitle = category.name;
        const subcategoryTitle = subcategory.name;
        const teacherName = teachers.name;
        const experience = teachers.experience;

        const reviews = await Review.find({ lesson: lesson_id });
        const count = await Review.countDocuments({ lesson: lesson_id });

        res.render('lessondetails.ejs',{ subcategoryTitle , categoryTitle, teacherName, description, experience, rating, price, lesson_id, location, reviews, count, isLoggedIn});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:lessondetails', async (req, res) => {
    try {
        const lesson = req.params.lessondetails;

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        const formattedDateString = formattedDate.toString();
        const date = formattedDateString;

        const name = req.body.name;
        const email = req.body.email;
        const comment = req.body.comment;

        const newReview = new Review({ lesson, name, email, date, comment });

        newReview.save()
            .then(() => {
                res.redirect(`/lessondetails/${lesson}?review=success`);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
