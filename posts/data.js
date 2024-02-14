const { getDb } = require("../db/mongo");
const { ObjectId } = require("mongodb");

const collection = "subreddit";

async function insert(post) {
  const db = await getDb();
  const result = await db.collection(collection).insertOne(post);

  return result.insertedId;
}

function find(name) {}

module.exports = {
  insert,
  find,
};
