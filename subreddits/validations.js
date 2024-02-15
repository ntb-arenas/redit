const Joi = require("joi");

function validateSubredditId(subredditId, res) {
  //check if the input string contains exactly 24 characters, each of which must be a digit (0-9) or a valid hexadecimal character (a-f, A-F)
  //e.g. 65cd56a8df2224917919d0b4
  const subredditIdSchema = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required();

  const { error, value } = subredditIdSchema.validate(subredditId);

  if (error) {
    return res.status(400).json(error.details);
  }

  return value;
}

module.exports = {
  validateSubredditId,
};
