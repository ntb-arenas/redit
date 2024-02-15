const Joi = require("joi");

//check if the id string contains exactly 24 characters, each of which must be a digit (0-9) or a valid hexadecimal character (a-f, A-F)
//e.g. 65cd56a8df2224917919d0b4
const idSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required();

const subredditSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
});

const postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
});

const commentSchema = Joi.object({
  author: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
});

module.exports = {
  subredditSchema,
  idSchema,
  postSchema,
  commentSchema,
};
