const router = require("express").Router();
const { Comment } = require("../../models/index");

router.get("/", async (req, res) => [
  // Get all comments
]);

// Create new comment
router.post("/create", async (req, res) => {
  console.log(
    "\n***********\n/api/comment/create route called!\n***********\n"
  );
  try {
    const commentBody = {
      content: req.body.content,
      author_id: req.session.user_id,
      post_id: req.body.post_id,
      creation_time: Date.now(),
    };

    console.log("comment body to be created:", commentBody);

    const newComment = await Comment.create(commentBody);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Get all comments

// Get individual comment

// Update individual comment

// Delete comment

module.exports = router;
