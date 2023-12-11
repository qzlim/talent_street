const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const isLoggedIn = req.session.user;
        res.render('login.ejs', {isLoggedIn});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });

        if (!user) {
            return res.redirect('/login?login=notfound');
        }

        bcrypt.compare(password.trim(), user.password.trim(), (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (result) {
                req.session.user = user;
                res.redirect('/?login=success');
            } else {
                return res.redirect('/login?login=incorrect');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
