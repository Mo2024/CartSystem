const jwt = require("jsonwebtoken");

const createAccessToken = userId => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
    })
};

const createRefreshToken = userId => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    })
};

module.exports = {
    createAccessToken,
    createRefreshToken
}