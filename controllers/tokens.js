const jwt = require("jsonwebtoken");
const { db } = require("..");


// const createAccessToken = userId => {
//     return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
//     })
// };

// const createRefreshToken = userId => {
//     return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
//     })
// };

// const sendAccessToken = (res, req, accesstoken) => {
//     res.send({
//         accesstoken,
//         email: req.body.email
//     })
// }

// const sendRefreshToken = (res, refreshtoken) => {
//     res.cookie('jwt', refreshtoken, {
//         httpOnly: true,
//         path: '/refresh_token'
//     })
// }


function refreshToken(req, res, next) {
    jwt.verify(req.cookies.ref, process.env.REFRESH_TOKEN_SECRET, async (err, refToken) => {
        const id = refToken.id
        if (refToken) {
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            res.cookie('jwt', token, {
                expires: new Date(new Date().getTime() + 1 * 60000),
                httpOnly: true
            });
            console.log("worked")
            accessToken(req, res, next)
            return next();

        } else {
            res.send("Please log in");
            return next();
        }
    });
}

function accessToken(req, res, next) {

    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, user) => {

        if (user) {
            // req.user = user;
            db.query('SELECT * FROM users WHERE id = ?', [user.id], (error, result) => {

                if (!result) {
                    return next();
                }
                const { id, username } = result[0]
                req.user = { id, username };
                return next();

            });
            // return next();
        }
        else if (err.message === "jwt expired") {
            modules.refreshToken(req, res, next)
        } else {
            res.status(403).json({ err, message: "User not authenticated" });
            return next();
        }
    });

}

module.exports = {
    refreshToken,
    accessToken
}