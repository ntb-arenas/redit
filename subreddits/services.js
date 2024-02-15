const data = require("./data");

async function createSubreddit(newSubreddit) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newSubreddit.createdAt = Date.now();

  // Insert the new post object into the data store
  const newSubredditId = await data.insertSubreddit(newSubreddit);

  // Return the ID of the newly inserted post
  return newSubredditId;
}

async function createPost(newPost) {
  // Set createdAt to the current timestamp in milliseconds since epoch
  newPost.createdAt = Date.now();

  // Insert the new post object into the data store
  const newPostId = await data.insert(newPost);

  // Return the ID of the newly inserted post
  return newPostId;
}

// function find(options) {
//   return data.find(options);
// }

// function getById(id) {
//   return data.getById(id);
// }

// function update(id, prod) {
//   return data.update(id, prod);
// }

// function del(id) {
//   return data.del(id);
// }

module.exports = {
  createSubreddit,
};
