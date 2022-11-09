const router = require("express").Router();
// const { NOW } = require('sequelize');
// const Post = require('../../models/Post')
// const User = require('../../models/User')
const { Post, User, Comment } = require("../../models/index");
const moment = require("moment");

router.get("/", async (req, res) => [
  // Get all posts
]);

// Create new post
router.post("/create", async (req, res) => {
  console.log("\nroute api/post/create called!\n");
  try {
    let writingUser = await User.findOne({
      where: {
        username: req.session.username,
      },
    });

    writingUser = writingUser.get({ plain: true });
    // console.log("writingUser: ", writingUser);
    // console.log("Date.now():", Date.now());

    const postContent = {
      author_id: writingUser.id,
      creation_time: Date.now(),
      title: req.body.postTitle,
      content: req.body.postContent,
    };

    const newPost = await Post.create(postContent);

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Get all posts

// Get individual post

// Update individual post
router.put("/edit/", async (req, res) => {
  console.log("\n**********\nPost edit route called\n**********\n");

  try {
    // Create the body of the post edit for logging
    const editContent = {
      author_id: req.session.user_id,
      creation_time: Date.now(),
      title: req.body.postTitle,
      content: req.body.postContent,
    };

    // Log the content prior to actually editing the post
    console.log("Edited post to write:", editContent);

    // Update the post with new content
    const editPost = await Post.update(editContent, {
      where: {
        id: req.body.postID,
      },
    });

    // Send confirmatory info
    res.status(200).json(editPost);
  } catch (err) {
    // Log and send any errors
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete post
router.delete("/delete", async (req, res) => {
  console.log(
    `\n**********\n\n**********\nDelete post route called for postID ${req.body.postID}\n**********\n\n**********\n`
  );

  try {
    const delPost = await Post.destroy({
      where: {
        id: parseInt(req.body.postID),
      },
    });

    res.status(200).json(delPost)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
