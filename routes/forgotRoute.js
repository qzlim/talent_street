const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const userEmail = req.body.email;

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.redirect('/login?reset=user-not-found');
        } else {
            return res.redirect('/login?reset=email-sent');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;