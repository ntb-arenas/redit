const { getDb } = require("../db/mongo");
const { ObjectId } = require("mongodb");

const subredditCollection = "subreddit";
const postsCollection = "posts";
const commentsCollection = "comments";

async function insertSubreddit(post) {
  const db = await getDb();
  const result = await db.collection(subredditCollection).insertOne(post);

  return result.insertedId;
}

async function insertPost(subredditId, post) {
  const db = await getDb();

  // Check if the subreddit community exists in the subreddit collection
  const subreddit = await db
    .collection(subredditCollection)
    .findOne({ _id: new ObjectId(id) });
  if (!subreddit) {
    return "Subreddit community not found";
  }

  // Insert the post
  const result = await db
    .collection(postsCollection)
    .insertOne({ subredditId: new ObjectId(subredditId), ...post });

  return result.insertedId;
}

// Get all the posts from the subreddit id
async function getAllPosts(id) {
  const db = await getDb();
  const result = await db
    .collection(postsCollection)
    .find({ subredditId: new ObjectId(id) })
    .toArray();

  return result;
}

// Insert comment in a post
async function insertComment(id, comment) {
  const db = await getDb();

  // Check if the post exists in the post collection
  const post = await db
    .collection(postsCollection)
    .findOne({ _id: new ObjectId(id) });
  if (!post) {
    return "Post not found";
  }

  // Insert the comment
  const result = await db
    .collection(commentsCollection)
    .insertOne({ postId: new ObjectId(id), ...comment });

  return result.insertedId;
}

module.exports = {
  insertSubreddit,
  insertPost,
  getAllPosts,
  insertComment,
};
