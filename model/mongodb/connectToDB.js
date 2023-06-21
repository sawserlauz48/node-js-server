const mongoose = require("mongoose");
const config = require("config");

const connectToDB = () => {
    return mongoose.connect(config.get("dbConfig.url"));
}

module.exports = connectToDB; 