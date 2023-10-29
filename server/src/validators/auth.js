const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin
};