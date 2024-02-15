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
  const { error, value } = subredditSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details);
  }

  const created = await services.create(value);

  res.status(201).json(created);
});

router.post("/subreddits/:subredditId/posts", async (req, res) => {
  const { subredditId } = req.params;
  const { title, content } = req.body;

  // const db = client.db('your-database-name');
  // const post = await db.collection('posts').insertOne({ subredditId: ObjectId(subredditId), title, content });
  // res.json(post.ops[0]);
});

module.exports = router;
