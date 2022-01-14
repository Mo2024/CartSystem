const { db } = require("..");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = (req, res) => {
    // console.log(req.body);

    const { name, username, email, password, cfmPassword } = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) { console.log(error) };
        if (result.length > 0) {
            return res.render('signup.ejs', {
                message: "Email is already registered"
            });
        } else if (password !== cfmPassword) {
            return res.render('signup.ejs', {
                message: "Passwords do not match"

            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)

    })

}