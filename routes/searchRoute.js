const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');

router.get('/', async (req, res) => {
    const isLoggedIn = req.session.user;

    const query = req.query.query;
    const regexPattern = `${query.charAt(0).toUpperCase()}${query.slice(1).toLowerCase()}`;
    const isSearchResult = req.query.source === 'search';
    
    if (typeof query !== 'string' || query.trim().length < 3) {
        res.render('searchResult.ejs', { isSearchResult, regexPattern, isLoggedIn});
    }
    try {
        const subcategory = await Subcategory.findOne({ name: { $regex: regexPattern, $options: 'i' } });
        const subcategoryTitle = subcategory.name;
        const subcategoryId = subcategory._id;

        const categoryID = subcategory.cat_id;
    
        const category = await Category.findOne({ _id: categoryID });
        const categoryTitle = category.name;
    
        const lessons = await Lesson.find({ subcategory: { $in: subcategoryId } });

        const teacherID = lessons.map(lesson => lesson.teacher);
        console.log(teacherID)
        const teachers = await Teacher.find( {_id :{$in: teacherID}} );

        res.render('lesson.ejs', { lessons, teachers, categoryTitle, subcategoryTitle, isSearchResult, regexPattern, isLoggedIn });
    } catch (error) {
        res.render('searchResult.ejs', { isSearchResult, regexPattern, isLoggedIn });
    }
});

module.exports = router;
