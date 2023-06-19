const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.object().keys({
        firstName: Joi.string().min(2).max(256).required(),
        middleName: Joi.string().min(2).max(256).allow(""),
        lastName: Joi.string().min(2).max(256).required(),
    }).required(),
    phone: Joi.string()
        .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
        .required(),
    email: Joi.string().regex(new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)).required(),
    password: Joi.string().regex(new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/)).min(6).max(16).required(),
    image: Joi.object().keys({
        url: Joi.string()
            .regex(new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
        alt: Joi.string().min(2).max(256).required(),
    }),
    address: Joi.object().keys({
        state: Joi.string().min(2).max(256).allow(""),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().min(1).required(),
    }).required(),
    isBusiness: Joi.bool().required(),
    isAdmin: Joi.bool().allow(""),
});

const idSchema = Joi.string().hex().required();


const validateIdSchema = (userInput) => { return idSchema.validateAsync(userInput); }

const validateRegisterSchema = (userInput) => { return registerSchema.validateAsync(userInput); }

module.exports = { validateRegisterSchema, validateIdSchema }
