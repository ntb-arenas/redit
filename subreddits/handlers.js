const express = require("express");
const router = express.Router();
const Joi = require("joi");
const services = require("./services");
const validations = require("./validations");

/*****************************************************************/
/****************  CREATE A SUBREDDIT COMMUNITY ******************/
/*****************************************************************/
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

/*****************************************************************/
/****************  CREATE A POST (IN A SUBREDDIT) ****************/
/*****************************************************************/
const postsSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
});

router.post("/subreddits/:subredditId/posts", async (req, res) => {
  // Validate subredditId
  const subredditId = validations.validateSubredditId(
    req.params.subredditId,
    res
  );

  if (subredditId === req.params.subredditId) {
    // Validate post details
    const { error: postsError, value: postsValue } = postsSchema.validate(
      req.body
    );
    if (postsError) {
      return res.status(400).json(postsError.details);
    }

    // If validation passes, proceed with creating the Post
    const created = await services.createPost(subredditId, postsValue);
    res.status(201).json(created);
  }
});

/*****************************************************************/
/********  LIST A SUBREDDIT'S POSTS BY SUBREDDIT ID **************/
/*****************************************************************/
router.get("/subreddits/:subredditId/posts", async (req, res) => {
  const subredditId = validations.validateSubredditId(
    req.params.subredditId,
    res
  );

  if (subredditId === req.params.subredditId) {
    const result = await services.getAllPosts(subredditId);
    res.json(result);
  }
});

module.exports = router;
