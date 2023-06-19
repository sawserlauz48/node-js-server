const joiCardsValidation = require("./joi/cardValidation");
const config = require("config");

const validatorOption = config.get("validatorOption");


const createCardValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiCardsValidation.validateCardSchema(userInput);
    }
    throw new Error("validator undefined");
};
const createCardIdValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiCardsValidation.validateIdSchema(userInput);
    }
    throw new Error("validator undefined");
};

module.exports = { createCardValidation, createCardIdValidation };