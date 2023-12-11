const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const isLoggedIn = req.session.user;
        res.render('signup.ejs',{isLoggedIn});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const password1 = req.body.password1;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ error: 'User with this email already exists' });
        }

        if (password !== password1) {
            return res.status(400).send({ error: 'Passwords do not match' });
        }


        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            const newUser = new User({ firstName, lastName, email, password: hash });
            newUser.save()
                .then(() => {
                    res.redirect('/login?signup=success');
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;