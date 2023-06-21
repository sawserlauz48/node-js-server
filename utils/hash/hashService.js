const config = require("config");
const bcryptjs = require("./bcrypt");


const hashOption = config.get("hashOption");


const generateHash = (password) => {
    switch (hashOption) {
        case "bcryptjs":
            return bcryptjs.generateHash(password);
    }
};

const compereHash = (password, hash) => {
    switch (hashOption) {
        case "bcryptjs":
            return bcryptjs.compereHash(password, hash);
    }
};

module.exports = {
    generateHash,
    compereHash
}