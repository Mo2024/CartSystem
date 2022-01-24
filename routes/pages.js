const express = require("express");
const functions = require('./functions')
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/', authController.isLoggedIn, async (req, res) => {
    if (req.cookies.register) {
        res.clearCookie("register");
    }
    console.log(req.user)
    res.render('home.ejs', {
        dropdownResults: await functions.navBar(),
        user: req.user,
        message: req.cookies.register
    });


});


router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

// router.get('/profile', authController.isLoggedIn, async (req, res) => {

// });

router.get('/profile', authController.isLoggedIn, async (req, res) => {
    if (req.user) {
        console.log(req.user)
        res.render('profile/mainProfile.ejs', {
            dropdownResults: await functions.navBar(),
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});


module.exports = router;