const express = require("express");
const router = express.Router();
const Joi = require("joi");
const services = require("./services");

router.get("/posts", (req, res) => {
  if (req.query.name) {
    res.status(200).json(services.find({ name: req.query.name }));
  }
  res.status(200).json(services.find());
});

// subreddit schema
const subredditSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
});

router.post("/subreddits", async (req, res) => {
  // Validate the request body against the subreddit schema
  const { error, value } = subredditSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  // If validation passes, proceed with creating the subreddit
  const created = await services.createSubreddit(value);
  res.status(201).json(created);
});

//check if the input string contains exactly 24 characters, each of which must be a digit (0-9) or a valid hexadecimal character (a-f, A-F)
//e.g. 65cd56a8df2224917919d0b4
const subredditIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required();

const postsSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
});

router.post("/subreddits/:subredditId/posts", async (req, res) => {
  // Validate subredditId
  const { error: subredditIdError, value: subredditIdValue } =
    subredditIdSchema.validate(req.params.subredditId);
  if (subredditIdError) {
    return res.status(400).json(subredditIdError.details);
  }

  // Validate post details
  const { error: postsError, value: postsValue } = postsSchema.validate(
    req.body
  );
  if (postsError) {
    return res.status(400).json(postsError.details);
  }
});

module.exports = router;
