// const jwt = require("jsonwebtoken");

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
// module.exports = {
//     createAccessToken,
//     createRefreshToken,
//     sendAccessToken,
//     sendRefreshToken
// }