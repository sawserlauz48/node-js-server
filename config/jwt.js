const jwt = require("jsonwebtoken");
const config = require("config");

const generateToken = (payload, exDate = "30d") => new Promise((resolve, reject) => {
    jwt.sign(payload, config.get("jwt"), {
        expiresIn: exDate
    }, (err, token) => {
        if (err) reject(err);
        else resolve(token);
    });
});

const verifyToken = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, config.get("jwt"), (err, payload) => {
        if (err) reject(err);
        else resolve(payload);
    });
});

module.exports = {
    generateToken,
    verifyToken
}