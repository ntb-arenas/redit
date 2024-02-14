const data = require("./data");

async function create(newPost) {
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
  create,
};
