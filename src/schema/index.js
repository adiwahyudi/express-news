import Joi from "joi";

export { registerSchema, loginSchema } from './auth.js';
export { categorySchema } from './category.js'
export { createNewsSchema, updateNewsSchema } from './news.js'

export const getPathById = Joi.object().keys({
    id: Joi.number().required()
});