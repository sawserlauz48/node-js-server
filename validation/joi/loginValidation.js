const Joi = require("joi");


loginSchema = Joi.object({
    email: Joi.string().regex(new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)).required(),
    password: Joi.string().regex(new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/)).min(6).max(16).required(),
})

const validateLoginSchema = (userInput) => loginSchema.validateAsync(userInput)

module.exports = { validateLoginSchema }