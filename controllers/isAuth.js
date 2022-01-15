// const { verify } = require('jsonwebtoken');

// const isAuth = req => {
//     const authorization = req.headers['authorization'];
//     if (!authorization) throw new Error("You need to log in")
//     const token = authorization.split(' ')[1];
//     const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
//     return id;
// }
// module.exports = {
//     isAuth
// }