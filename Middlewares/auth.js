const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access Denied! No Token Provided");
    try {
        const verification = jwt.verify(token, config.get('jwtKey'));
        req.user = verification;
        next();

    } catch (ex) {
        res.status(400).send("Invalid Token");
    }
}