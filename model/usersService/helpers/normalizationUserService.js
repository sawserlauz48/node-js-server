const config = require("config");
const normalizationUserMongo = require("../../mongodb/users/helpers/normalizationUser");
const dbOption = config.get("dbOption");

const normalizeUserService = (userData) => {
    if (dbOption === "mongo") {
        return normalizationUserMongo(userData)
    }
};

module.exports = normalizeUserService;