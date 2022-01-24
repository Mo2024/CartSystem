const express = require("express");
const functions = require('./functions')
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

// router.post('/test', authController.isLoggedIn); maybe async ofr is logged in maybe?

router.get('/logout', authController.logout);

router.post('/close', async (req, res) => {
    res.clearCookie("register");
    return res.status(200).redirect("/");

});

// router.post('/protected', authController.protected);

module.exports = router;