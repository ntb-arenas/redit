const { getDb } = require("../db/mongo");
const { ObjectId } = require("mongodb");

const subredditCollection = "subreddit";
const postsCollection = "posts";
const commentsCollection = "comments";

async function findItemById(db, id, collection) {
  const item = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });

  if (!item) {
    return null;
  }

  return item;
}

async function insertSubreddit(post) {
  const db = await getDb();
  const result = await db.collection(subredditCollection).insertOne(post);

  return result.insertedId;
}

async function insertPost(subredditId, post) {
  const db = await getDb();

  // Check if the subreddit community exists in the subreddit collection
  const subreddit = await findItemById(db, subredditId, postsCollection);

  if (!subreddit) {
    return "Subreddit community not found";
  } else {
    const result = await db
      .collection(postsCollection)
      .insertOne({ subredditId: new ObjectId(subredditId), ...post });

    return result.insertedId;
  }
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
  const post = await findItemById(db, id, postsCollection);

  if (!post) {
    return "Post not found";
  } else {
    // Insert the comment
    const result = await db
      .collection(commentsCollection)
      .insertOne({ postId: new ObjectId(id), ...comment });

    return result.insertedId;
  }
}

// Get all the comments from the subreddit post
async function getAllComments(id) {
  const db = await getDb();

  // Check if the post exists in the post collection
  const post = await findItemById(db, id, postsCollection);

  if (!post) {
    return "Post not found";
  } else {
    // Get all the comments
    const result = await db
      .collection(commentsCollection)
      .find({ postId: new ObjectId(id) })
      .toArray();

    return result;
  }
}

// Update a post
async function updatePost(id, newPost) {
  const db = await getDb();

  // Check if the post exists in the post collection
  const post = await findItemById(db, id, postsCollection);

  if (!post) {
    return "Post not found";
  } else {
    // Get all the comments
    const result = await db
      .collection(postsCollection)
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...newPost } });

    return result;
  }
}

module.exports = {
  insertSubreddit,
  insertPost,
  getAllPosts,
  insertComment,
  getAllComments,
  updatePost,
};
