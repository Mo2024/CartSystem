const { db } = require("..");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
            const role = results[0].role
            // const accesstoken = createAccessToken(id);
            // const refreshtoken = createRefreshToken(id);

            // db.query("UPDATE users SET refreshtoken = ? WHERE email = ? OR username = ?", [refreshtoken, email, email], (err, results) => {
            //     if (err) throw err;
            //     // Should include login successful or somthn soon
            //     console.log("Success");
            //     // console.log(req)
            // });
            // sendRefreshToken(res, refreshtoken);
            // sendAccessToken(res, req, accesstoken);
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const refreshtoken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
            });


            if (reg) {
                res.cookie('register', "User registered!", {
                    expires: new Date(new Date().getTime() + 5 * 60000),
                    httpOnly: true
                })
            }
            res.cookie('jwt', token, {
                expires: new Date(new Date().getTime() + 1 * 60000),
                httpOnly: true
            });
            res.cookie('ref', refreshtoken, {
                expires: new Date(new Date().getTime() + 10080 * 60000),
                httpOnly: true
            });

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
