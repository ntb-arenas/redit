require("dotenv").config();

const pino = require("pino-http");
const express = require("express");
const app = express();
const posts = require("./posts/handlers");

app.use(express.json());
app.use(pino());

app.use(posts);

const port = process.env.PORT || 3000;

async function start(app) {
  app.listen(port, () => {
    console.log("server is running (express)");
  });
}

start(app)
  .then(() => console.log("start routine complete"))
  .catch((err) => console.log("star routine error: ", err));
