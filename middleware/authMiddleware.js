const jwt = require("../config/jwt");
const chalk = require("chalk");

const CustomError = require("../utils/CustomError");

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers["x-auth-token"]) {
            throw new CustomError("please provide token");
            console.log(chalk.redBright("User didn't provide token!"));
        }
        const userData = await jwt.verifyToken(req.headers["x-auth-token"]);
        if (!userData) {
            console.log(chalk.redBright("Invalid Token!"));
            return res.status(401).json({ msg: "Invalid  Token!" });
        }
        req.userData = userData;
        next();
    } catch (error) {
        let errToSend;
        if (error instanceof CustomError) {
            errToSend = error;
        } else {
            errToSend = new CustomError("invalid token")
        }
        res.status(401).json(errToSend)
        console.log(chalk.redBright(errToSend))
    }
}

module.exports = authMiddleware;