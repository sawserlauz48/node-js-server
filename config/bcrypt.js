const bcrypt = require("bcryptjs");

const generateHash = (password) => {
    return bcrypt.hash(password, 10);
}

const compereHash = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
    generateHash,
    compereHash
}