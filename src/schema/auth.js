import Joi from 'joi';

const registerSchema = Joi.object().keys({
    username: Joi.string().min(6).max(30).required(),
    name: Joi.string().max(100).required(),
    password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


export {
    registerSchema,
    loginSchema
}