const express = require("express");
const functions = require('./functions')
const authController = require('../controllers/auth')
const router = express.Router();

router.post('/register', authController.register)



module.exports = router;