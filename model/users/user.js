const mongoose = require("mongoose");
const Image = require("../cards/image");
const Address = require("../cards/Address");
const Name = require("./name");
const { URL } = require("../cards/helpers/mongooseValitation");

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
        match: RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/),
        required: true,

    },
    web: URL,
    image: Image,
    address: Address,
    isAdmin: { type: Boolean, default: false },
    isBiz: { type: Boolean, default: false },
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

