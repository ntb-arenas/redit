const { getDb } = require("../db/mongo");
const { ObjectId } = require("mongodb");

const collection = "subreddit";

async function insertSubreddit(post) {
  const db = await getDb();
  const result = await db.collection(collection).insertOne(post);

  return result.insertedId;
}

async function insertPost(post) {
  const db = await getDb();
  const result = await db.collection(collection).insertOne(post);

  return result.insertedId;
}

function find(name) {}

module.exports = {
  insertSubreddit,
  insertPost,
};
