const data = require("./data");

async function createSubreddit(newSubreddit) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newSubreddit.createdAt = Date.now();

  // Insert the new post object into the data store
  const newSubredditId = await data.insertSubreddit(newSubreddit);

  // Return the ID of the newly inserted post
  return newSubredditId;
}

async function createPost(subredditId, newPost) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newPost.createdAt = Date.now();

  // Insert the new post object into the data store
  const newPostId = await data.insertPost(subredditId, newPost);

  // Return the ID of the newly inserted post
  return newPostId;
}

function getAllPosts(id) {
  return data.getAllPosts(id);
}

module.exports = {
  createSubreddit,
  createPost,
  getAllPosts,
};
