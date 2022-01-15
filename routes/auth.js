const express = require("express");
const functions = require('./functions')
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

// router.post('/protected', authController.protected);

module.exports = router;