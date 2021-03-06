const { db } = require("..");
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('./tokens')

var onlyNumRegex = new RegExp('^[0-9]*$');
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
var userRegex = new RegExp("^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
var nameRegex = new RegExp("^([^0-9]*)$");


function loginProcess(email, password, res, reg = false) {

    db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, email], async (error, results) => {
        if (typeof results == 'undefined' || !results || results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).render('login.ejs', {
                message: 'Email or Password is incorrect'
            })
        } else {
            const id = results[0].id;

            if (reg) {
                res.cookie('register', "User registered!", {
                    expires: new Date(new Date().getTime() + 5 * 60000),
                    httpOnly: true
                })
            }
            createAccessToken(res, id)
            createRefreshToken(res, id)

            return res.status(200).redirect("/");

        }

    })

}

module.exports = {
    onlyNumRegex,
    strongRegex,
    emailRegex,
    userRegex,
    nameRegex,
    loginProcess
}
