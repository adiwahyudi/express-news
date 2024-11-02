import Joi from "joi";

const createNewsSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number(),
});


const updateNewsSchema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    categoryId: Joi.number(),
}).min(1)

export {
    createNewsSchema,
    updateNewsSchema
}