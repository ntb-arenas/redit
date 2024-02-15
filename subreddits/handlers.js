const express = require("express");
const router = express.Router();
const Joi = require("joi");
const services = require("./services");
const schema = require("./schemas");

function handleError(error1, error2, res) {
  const errors = {};

  if (error1) {
    errors.error1 = error1.details;
  }

  if (error2) {
    errors.error2 = error2.details;
  }

  return res.status(400).json(errors);
}

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
router.post("/subreddits/:subredditId/posts", async (req, res) => {
  // Validate subredditId
  const { error: subrreditIdError, value: subredditId } =
    schema.idSchema.validate(req.params.subredditId);

  const { error: postsError, value: postsValue } = schema.postSchema.validate(
    req.body
  );

  if (subrreditIdError || postsError) {
    return handleError(subrreditIdError, postsError, res);
  }

  // If validation passes, proceed with creating the Post
  const created = await services.createPost(subredditId, postsValue);
  res.status(201).json(created);
});

/*****************************************************************/
/********  LIST POSTS BY SUBREDDIT ID **************/
/*****************************************************************/
router.get("/subreddits/:subredditId/posts", async (req, res) => {
  const { error, value } = schema.idSchema.validate(req.params.subredditId);

  if (error) {
    return res.status(400).json(error.details);
  }

  const result = await services.getAllPosts(value);
  res.json(result);
});

/*****************************************************************/
/****************  CREATE A COMMENT (IN A POST) ******************/
/*****************************************************************/
router.post("/posts/:postId/comments", async (req, res) => {
  const { error: postIdError, value: postId } = schema.idSchema.validate(
    req.params.postId
  );
  const { error: commentError, value: commentValue } =
    schema.commentSchema.validate(req.body);

  if (postIdError || commentError) {
    return handleError(postIdError, commentError, res);
  }

  // If there are errors related to post ID or comments, constructs an errors object containing
  // their details and sends a 400 status response with the errors as JSON.

  // If validation passes, proceed with creating the subreddit
  const created = await services.createComment(postId, commentValue);
  res.status(201).json(created);
});

module.exports = router;
