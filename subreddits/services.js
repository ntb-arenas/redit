const data = require("./data");

async function createSubreddit(newSubreddit) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newSubreddit.createdAt = Date.now();

  // Insert the new post object into the data store
  const newSubredditId = await data.insertSubreddit(newSubreddit);

  // Return the ID of the newly inserted post
  return newSubredditId;
}

async function createPost(id, newPost) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newPost.createdAt = Date.now();

  // Insert the new post object into the data store
  const newPostId = await data.insertPost(id, newPost);

  // Return the ID of the newly inserted post
  return newPostId;
}

function getAllPosts(id) {
  return data.getAllPosts(id);
}

async function createComment(id, newComment) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newComment.createdAt = Date.now();

  // Insert the new Comment object into the data store
  const newCommentId = await data.insertComment(id, newComment);

  // Return the ID of the newly inserted Comment
  return newCommentId;
}

function getAllComments(id) {
  return data.getAllComments(id);
}

function updatePost(id, newPost) {
  return data.updatePost(id, newPost);
}

module.exports = {
  createSubreddit,
  createPost,
  getAllPosts,
  createComment,
  getAllComments,
  updatePost,
};
