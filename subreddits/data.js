const { getDb } = require("../db/mongo");
const { ObjectId } = require("mongodb");

const subredditCollection = "subreddit";
const postsCollection = "posts";

async function insertSubreddit(post) {
  const db = await getDb();
  const result = await db.collection(subredditCollection).insertOne(post);

  return result.insertedId;
}

async function insertPost(subredditId, post) {
  const db = await getDb();

  const result = await db
    .collection(postsCollection)
    .insertOne({ subredditId: new ObjectId(subredditId), ...post });

  return result.insertedId;
}

async function getAllPosts(id) {
  const db = await getDb();
  const result = await db
    .collection(postsCollection)
    .find({ subredditId: new ObjectId(id) })
    .toArray();

  return result;
}

module.exports = {
  insertSubreddit,
  insertPost,
  getAllPosts,
};
