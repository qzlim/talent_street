const express = require('express');
const router = express.Router();
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');

router.get('/:subcategory', async (req, res) => {
  try {
    const isLoggedIn = req.session.user;

    const subcategory = req.params.subcategory;
    const pageTitle = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);

    const category = await Category.findOne({ name: pageTitle });

    if (!category) {
      return res.status(404).send('Category not found');
    }

    const categoryID = category._id;
    const subcategories = await Subcategory.find({ cat_id: categoryID });

    res.render('subcategory.ejs', { pageTitle, subcategories, isLoggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;

