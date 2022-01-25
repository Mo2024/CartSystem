const { db } = require("..");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const modules = require('./modules')
const { promisify } = require('util');
const { refreshToken, accessToken } = require('./tokens')
const { isAuth } = require('./isAuth')

// Register user
exports.register = (req, res) => {

    const { name, username, email, password, cfmPassword, number, gender } = req.body

    db.query('SELECT email FROM users WHERE email = ?; SELECT username FROM users WHERE username = ?', [email, username], async (error, result) => {
        // console.log(req.body)
        if (error) { throw error };

        if (!modules.nameRegex.test(name)) {
            return res.render('signup.ejs', {
                message: "Make sure that your name has no numbers"
            });
        }
        else if (!modules.userRegex.test(username.toLowerCase())) {
            return res.render('signup.ejs', {
                message: "Make sure that your username has the following:",
                req1: "Only alphanumeric characters between 4-20, an underscore and a dot",
                req2: "underscore and a dot cannot be next to each other nor two underscores or two dots"
            });
        }
        else if (result[1].length > 0) {
            return res.render('signup.ejs', {
                message: "Username is already in use"
            });
        }
        else if (!modules.emailRegex.test(email)) {
            return res.render('signup.ejs', {
                message: "Enter a valid email"
            });
        }
        else if (result[0].length > 0) {
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

        db.query("INSERT INTO users SET ?", { name: name, username: username.toLowerCase(), email: email, password: hashedPassword, number: number, gender: gender }, (err, results) => {
            if (err) throw err;
            return modules.loginProcess(email, password, res, reg = true);

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
        modules.loginProcess(email, password, res);

    }
    catch (err) {
        throw err;
    }
}

// const isAuth = req => {
//     const authorization = req.header['authorization'];
// }
exports.isLoggedIn = async (req, res, next) => {
    // if (typeof req.cookies.jwt !== 'undefined') {
    // try {
    //     //1) verify the token
    //     const decoded = await promisify(jwt.verify)(req.cookies.jwt,
    //         process.env.JWT_SECRET
    //     );

    //     //2) Check if the user still exists
    //     db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {

    //         if (!result) {
    //             return next();
    //         }

    //         req.user = result[0];
    //         return next();

    //     });
    // } catch (error) {
    //     return next();
    // }


    // } else {
    //     next();
    // }
    // let token = req.headers["authorization"];
    // if (typeof token == 'undefined') {
    //     console.log(token)
    //     return next();
    // }
    // token = token.split(" ")[1]; //Access token
    if (req.cookies.jwt) {

        accessToken(req, res, next)

    } else if (req.cookies.ref) {

        refreshToken(req, res, next)

    }
    else {
        return next();
    }
    // console.log("Test")
    // return next
}


// Logout user
// exports.logout = (_req, res) => {

//     res.clearCookie('jwt');
//     return res.send({
//         message: 'Logged out'
//     })

// }
exports.logout = async (req, res) => {
    if (req.cookies.jwt) {
        res.cookie('jwt', 'logout', {
            expires: new Date(Date.now() + 2 * 1000),
            httpOnly: true
        });
    }
    res.cookie('ref', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}
//Protected route
// exports.protected = async (req, res) => {
//     try {
//         const id = isAuth(req)
//         if (id !== null) {
//             res.send({
//                 data: 'This is private channel'
//             })
//         }
//     }
//     catch (err) {
//         throw err

//     }
// }

