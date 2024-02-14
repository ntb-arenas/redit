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
  title: Joi.string().min(3).required(),
  posts: Joi.array().items(Joi.object()).required(),
});

// post schema
// const subredditPostSchema = Joi.object({
//   title: Joi.string().required(),
//   author: Joi.string().required(),
//   content: Joi.string().required(),
//   likes: Joi.number().integer().min(0).required(),
//   comments: Joi.array()
//     .items(
//       Joi.object({
//         user: Joi.string().required(),
//         comment: Joi.string().required(),
//       })
//     )
//     .required(),
// });

router.post("/subreddit/community", async (req, res) => {
  const { error, value } = subredditSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details);
  }

  console.log(value);

  const created = await services.create(value);

  res.status(201).json(created);
});

router.get("/submit/:subreddit", async (req, res) => {
  const subredditTitle = req.params.subreddit;
  const { subredditPosts } = req.body;

  console.log(subredditTitle);
});

module.exports = router;
