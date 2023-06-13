const jwt = require("../config/jwt");
const CustomError = require("../utils/CustomError");

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers["x-auth-token"]) throw new CustomError("please provide token");
        const userData = await jwt.verifyToken(req.headers["x-auth-token"]);
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
    }
}

module.exports = authMiddleware;