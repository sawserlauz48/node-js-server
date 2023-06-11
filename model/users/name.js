const mongoose = require("mongoose");
const {
    DEFAULT_STRING_SCHEMA_REQUIRED, DEFAULT_STRING_SCHEMA, } = require("../cards/helpers/mongooseValitation")

const Name = new mongoose.Schema({
    firstName: DEFAULT_STRING_SCHEMA_REQUIRED,
    middleName: DEFAULT_STRING_SCHEMA,
    lastName: DEFAULT_STRING_SCHEMA_REQUIRED,
});

module.exports = Name