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

    if (idStatus.length === 0) {
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
      const postCommInfo = await db.insertComment(commentEdit);

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

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const postInfo = await db.findById(id);

    if (postInfo.length === 0) {
      res.status(404).json({
        success: false,
        message: "The post with the specified ID does not exist."
      })
    } else {
      res.status(200).json({ 
        success: true,
        postInfo
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "The post information could not be retrieved.",
      errorMessage: err.message
    })
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const {id} = req.params;

    const postInfo = await db.findById(id);

    if (postInfo.length === 0) {
      res.status(404).json({
        success: false,
        message: "The post with the specified ID does not exist."
      })
    } else {
      const commentInfo = await db.findPostComments(id);

      res.status(200).json({
        success: true,
        commentInfo
      })
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      error: "The post information could not be retrieved.",
      errorMessage: err.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {

    const {id} = req.params;

    const postInfo = await db.findById(id);

    if (postInfo.length === 0) {
      res.status(404).json({
        success: false,
        message: "The post with the specified ID does not exist."
      })
    } else {
      const deletePost = await db.remove(id);

      res.status(202).json({
        success: true,
        message: "The post requested has been deleted",
        deletePost
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "The post could not be removed"
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const postInfo = await db.findById(id);

    const postEdited = {
      ...postInfo[0]
    };
 
    postEdited.title = req.body.title;
    postEdited.contents = req.body.contents;

    if (postInfo.length === 0) {
      res.status(404).json({
        success: false,
        message: "The post with the specified ID does not exist."
      })
    } else if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        success: false,
        errorMessage: "Please provide title and contents for the post."
      })
    } else {
      const commentInfo = await db.update(id, postEdited);
      
      res.status(200).json({
        success: true,
        postEdited
      })
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      error: "The post information could not be modified.",
      errorMessage: err.message
    })
  }
})

module.exports = router;