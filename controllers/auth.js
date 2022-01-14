const { db } = require("..");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
String.prototype.isNumber = function () { return /^\d+$/.test(this); }
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
var userRegex = new RegExp("^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")
var nameRegex = new RegExp("^([^0-9]*)$")



exports.register = (req, res) => {
    // console.log(req.body);

    const { name, username, email, password, cfmPassword, number, gender } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) { console.log(error) };

        if (!nameRegex.test(name)) {
            return res.render('signup.ejs', {
                message: "Make sure that your name has no numbers"
            });
        }
        else if (!userRegex.test(username)) {
            return res.render('signup.ejs', {
                message: "Make sure that your username has the following:",
                req1: "Only alphanumeric characters between 4-20, an underscore and a dot",
                req2: "underscore and a dot cannot be next to each other nor two underscores or two dots"
            });
        }
        else if (!emailRegex.test(email)) {
            return res.render('signup.ejs', {
                message: "Enter a valid email"
            });
        }
        else if (result.length > 0) {
            return res.render('signup.ejs', {
                message: "Email is already registered"
            });
        }
        else if (password !== cfmPassword) {
            return res.render('signup.ejs', {
                message: "Passwords do not match"

            });
        }
        else if (!strongRegex.test(password)) {
            return res.render('signup.ejs', {
                message: "Please make sure that your password has the following:",
                req1: "Capital letters",
                req2: "Has at least 8 characters, 1 capital letter, 1 small letter, and 1 special character Example:!@#\$%\^&\*"
            });
        }
        else if (!number.isNumber()) {
            return res.render('signup.ejs', {
                message: "Phone number has letter/symbols"

            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)

        db.query("INSERT INTO users SET ?", { name: name, username: username, email: email, password: hashedPassword, number: number, gender: gender }, (err, results) => {
            if (err) throw err;
            console.log(results)
            return res.render('signup.ejs', {
                message: "User registered"
            });
        });
    })

}