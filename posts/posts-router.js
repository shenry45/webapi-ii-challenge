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
    const {id} = req.params;
    const commentEdit = {
      ...req.body,
      post_id: id
    }

    const idStatus = await db.findById(id);

    if (!idStatus) {
      res.status(404).json({
        success: false,
        message: "The post with the specified ID does not exist."
      })
    } else if (!req.body.text) {
      res.status(400).json({
        success: false,
        errorMessage: "Please provide text for the comment."
      })
    } else {
      console.log('before 2nd await');
      const postCommInfo = await db.insertComment(commentEdit);
      console.log('after 2nd await');

      res.status(201).json({
        success: true,
        postCommInfo
      })
    }
  }
  catch(err) {
    res.status(500).json({
      success: false,
      error: "There was an error while saving the comment to the database",
      err: err.message
    })
  }
})

module.exports = router;