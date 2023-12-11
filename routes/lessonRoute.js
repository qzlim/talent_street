const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');


router.get('/:lesson', async (req, res) => {
  try {
    const isLoggedIn = req.session.user;

    const lesson = req.params.lesson;
    const subcategoryTitle = lesson.charAt(0).toUpperCase() + lesson.slice(1);

    const subcategory = await Subcategory.findOne({ name: subcategoryTitle });

    if (!subcategory) {
      return res.status(404).send('Subcategory not found');
    }

    const categoryID = subcategory.cat_id;
    const subcatID = subcategory._id;

    const category = await Category.findOne({ _id: categoryID });
    const categoryTitle = category.name;

    const lessons = await Lesson.find({ subcategory: subcatID });

    const teacherID = lessons.map(lesson => lesson.teacher);
    const teachers = await Teacher.find( {_id :{$in: teacherID}} );


    res.render('lesson.ejs', { subcategoryTitle, categoryTitle, lessons, teachers, isLoggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
