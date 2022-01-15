const express = require("express");
const functions = require('./functions')
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.isLoggedIn, async (req, res) => {

    res.render('home.ejs', { dropdownResults: await functions.navBar(), user: req.user });
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});



module.exports = router;