const mongoose = require("mongoose");
const Image = require("../cards/image");
const Address = require("../cards/Address");
const Name = require("./name");
const { DEFAULT_STRING_SCHEMA_REQUIRED, URL } = require("./helpers/mongooseValitation");

const userSchema = new mongoose.Schema({

    name: Name,
    phone: {
        type: String,
        required: true,
        trim: true,
        match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    },
    email: {
        type: String,
        trim: true,
        match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        match: RegExp(),
        required: true,
    },
    web: URL,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        minLength: 7,
        maxLength: 7,
        trim: true,
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,

    },

});

const User = mongoose.model("users", userSchema);

module.exports = User;

