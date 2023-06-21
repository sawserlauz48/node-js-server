const jwt = require("jsonwebtoken");
const config = require("config");
const chalk = require("chalk");

const generateToken = (payload, exDate = "30d") => new Promise((resolve, reject) => {
    jwt.sign(payload, config.get("jwt"), {
        expiresIn: exDate
    }, (err, token) => {
        if (err) {
            reject(err);
            console.log(chalk.redBright("Coulden't generate the token"));
        } else {
            resolve(token);
            console.log(chalk.greenBright("Token has been generated"));
        }
    });
});

const verifyToken = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, config.get("jwt"), (err, payload) => {
        if (err) {
            reject(err);
            console.log(chalk.redBright("Coulden't verify the token"));
        }
        else {
            resolve(payload);
            console.log(chalk.greenBright("Payload has been sent"));

        }

    });
});

module.exports = {
    generateToken,
    verifyToken
}