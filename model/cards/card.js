const mongoose = require("mongoose");
const Image = require("./image");
const Address = require("./Address");
const { DEFAULT_STRING_SCHEMA_REQUIRED, URL } = require("./helpers/mongooseValitation");

const cardSchema = new mongoose.Schema({
    title: DEFAULT_STRING_SCHEMA_REQUIRED,
    subTitle: DEFAULT_STRING_SCHEMA_REQUIRED,
    description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
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

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;

