const router = require("express").Router();
const { Post, User, Comment } = require("../../models/index");

// Create new post
router.post("/create", async (req, res) => {
  // console.log("\nroute api/post/create called!\n");
  try {
    // Find the User that corresponds to the logged in user
    let writingUser = await User.findOne({
      where: {
        username: req.session.username,
      },
    });

    // Strip out extra sequelize content
    writingUser = writingUser.get({ plain: true });
    // console.log("writingUser: ", writingUser);
    // console.log("Date.now():", Date.now());

    // Preparing the post content
    const postContent = {
      author_id: writingUser.id,
      creation_time: Date.now(),
      title: req.body.postTitle,
      content: req.body.postContent,
    };

    // Actually creating the new post
    const newPost = await Post.create(postContent);

    // Respond affirmatively
    res.status(200).json(newPost);
  } catch (err) {
    // If any of the above threw and error, log and send it
    console.log(err);
    res.status(400).json(err);
  }
});

// Update individual post
router.put("/edit/", async (req, res) => {
  // console.log("\n**********\n\n**********\n\n**********\nPost edit route called\n**********\n\n**********\n\n**********\n");

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
  // console.log(
  //   `\n**********\n\n**********\nDelete post route called for postID ${req.body.postID}\n**********\n\n**********\n`
  // );

  try {
    // Delete all comments that belong to the post
    // Theoretically this should be done through cascading delete - if this is commented out in the future that'll be a great success
    // const delComments = await Comment.destroy({
    //   where: {
    //     post_id: parseInt(req.body.postID),
    //   },
    // });

    // Delete the offending post
    const delPost = await Post.destroy({
      where: {
        id: parseInt(req.body.postID),
      },
    });

    // Send confirmatory info
    res.status(200).json(delPost);
  } catch (err) {
    // If any of the above threw an error, log and send it
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
