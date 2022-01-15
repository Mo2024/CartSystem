const { db } = require("..");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const modules = require('./modules')
const { promisify } = require('util');
const res = require("express/lib/response");


// Register user
exports.register = (req, res) => {

    const { name, username, email, password, cfmPassword, number, gender } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) { console.log(error) };

        if (!modules.nameRegex.test(name)) {
            return res.render('signup.ejs', {
                message: "Make sure that your name has no numbers"
            });
        }
        else if (!modules.userRegex.test(username)) {
            return res.render('signup.ejs', {
                message: "Make sure that your username has the following:",
                req1: "Only alphanumeric characters between 4-20, an underscore and a dot",
                req2: "underscore and a dot cannot be next to each other nor two underscores or two dots"
            });
        }
        else if (!modules.emailRegex.test(email)) {
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
        else if (!modules.strongRegex.test(password)) {
            return res.render('signup.ejs', {
                message: "Please make sure that your password has the following:",
                req1: "Capital letters",
                req2: "Has at least 8 characters, 1 capital letter, 1 small letter, and 1 special character Example:!@#\$%\^&\*"
            });
        }
        else if (!modules.onlyNumRegex.test(number)) {
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

// Login user
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login.ejs', {
                message: 'Please provide an email & password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, email], async (error, results) => {
            if (typeof results == 'undefined' || !results || results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
                return res.status(401).render('login.ejs', {
                    message: 'Email or Password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }

        })
    } catch (err) {

    }
}