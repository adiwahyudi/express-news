import Joi from "joi";

const categorySchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
});


export {
    categorySchema
}
