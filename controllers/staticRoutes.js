const router = require("express").Router();
const { Post, Comment, User } = require("../models/index");
const moment = require("moment");

// Homepage
router.get("/", async (req, res) => {
  // Get all posts to show on the front page
  let allPosts = await Post.findAll({
    include: [{ model: User }],
    order: [["id", "ASC"]],
  });

  // Stip out extra sequelize content
  allPosts = allPosts.map((row) => row.get({ plain: true }));

  // Logs for debugging
  console.log(allPosts);

  //   Render the homepage content with the post information and session
  res.render("homepage", {
    allPosts,
    // formattedTime: allPosts.map(post => moment(post.creation_time).format('MMM DD, Y')),
    sess: req.session,
  });
});


// Highlight of a single post with its comments
router.get("/post/:id", async (req, res) => {
  console.log("Post page rendering route called!");

  //   Get the post based on req.params
  const onePost = await Post.findOne({
    where: {
      id: parseInt(req.params.id) + 1,
    },
    include: [{ model: Comment }, { model: User }],
  });

  //   Debugging logs
  console.log("onePost:", onePost);
  let plainPost = onePost.get({ plain: true });
  console.log("plainPost:", plainPost);

  const comments = await Comment.findAll({
    where: {
      post_id: plainPost.id
    },
    include: [{model: User}]
  })

  const plainComments = comments.map(row => row.get({plain: true}))
  console.log('plainComments: ',plainComments)


  //   Render the page with post and session information
  res.render("post", {
    Post: plainPost,
    comments: plainComments,
    sess: req.session,
  });
});


// Dashboard for the user where they can make new posts
router.get("/dashboard", async (req, res) => {
  // If the user isn't logged in, dump them back to the home page
  if (!req.session.logged_in) {
    res.status(403).redirect("/loginSignUp");
    return;
  }

  //   Get all posts from the logged in user
  let allPosts = await Post.findAll({
    where: {
      author_id: req.session.user_id,
    },
    order: [["id", "ASC"]],
  });

  //   Strip out extra sequelize content
  allPosts = allPosts.map((row) => row.get({ plain: true }));

  //   Debugging logs
  console.log(allPosts);

  //   Render the page with posts and session info
  res.render("dashboard", {
    allPosts,
    sess: req.session,
  });
});

// Login and signup page
router.get("/loginSignUp", async (req, res) => {
  // If the user is already logged in, just dump them back to the home page
  if (req.session.logged_in) {
    res.status(400).redirect("/");
  } else {
    // If user isn't logged in, send them to the login/signup page
    res.render("loginSignUp", {
      sess: req.session,
    });
  }
});

module.exports = router;
