const { MongoClient } = require("mongodb");

// Singleton objec
let db;

// getDb returns an initialized MongoDB connection
async function getDb() {
  if (db) {
    console.log("Already connected to MongoDB");

    return db;
  }

  const client = new MongoClient(process.env.DB_URL);
  const connection = await client.connect();
  db = connection.db(process.env.DB_NAME);

  console.log("Connected to MongoDB");

  return db;
}

module.exports = {
  getDb,
};
