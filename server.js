const express = require('express');
const db = require('./data/db.js');
const postRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.use('/', async (req, res) => {
  try {
    const postInfo = await db.find();

    res.status(200).json({
      success: true,
      postInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "The posts information could not be retrieved.",
      errorMessage: err.message
    })
  }
})

module.exports = server;