const express = require("express");
const functions = require('./functions')
const router = express.Router();

router.get('/', async (req, res) => {
    let dropdownResults = await functions.navBar();

    res.render('home.ejs', { dropdownResults });
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});



module.exports = router;