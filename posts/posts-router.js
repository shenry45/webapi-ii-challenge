const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {    
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        success: false,
        errorMessage: "Please provide title and contents for the post."
      })
    }
    else {
      const postInfo = await db.insert(req.body);

      res.status(201).json({
        success: true,
        postInfo
      })
    }
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: err
    });
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
    if (!req.body.id) {
      res.status(404).json({
        success: false,
        message: "The post with the specified ID does not exist."
      })
    } else {
      const postInfo = await db.insertComment(req.body);

      res.status(201).json({
        success: true,
        postInfo
      })
    }
  }
  catch(err) {

  }
})

module.exports = router;