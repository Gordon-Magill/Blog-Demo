// Imports
const router = require("express").Router();
const { Post, Comment, User } = require("../models/index");
const loginCheck = require("../utils/loginCheck");

// Homepage rendering
router.get("/", async (req, res) => {
  // Get all posts to show on the front page
  let allPosts = await Post.findAll({
    include: [{ model: User }],
    order: [["id", "ASC"]],
  });

  // Stip out extra sequelize content
  allPosts = allPosts.map((row) => row.get({ plain: true }));

  // Logs for debugging
  // console.log(allPosts);

  //   Render the homepage content with the post information and session
  res.render("homepage", {
    allPosts,
    // formattedTime: allPosts.map(post => moment(post.creation_time).format('MMM DD, Y')),
    sess: req.session,
  });
});

// Highlight of a single post with its comments
router.get("/post/:id", async (req, res) => {
  // console.log("Post page rendering route called!");

  //   Get the post based on req.params
  let onePost = await Post.findOne({
    where: {
      id: parseInt(req.params.id),
    },
    include: [{ model: Comment }, { model: User }],
  });

  // If no page of the right id is found, dump them back to the front page
  if (onePost === null) {
    res.status(304).redirect("/");
    return;
  }

  // Strip out extra sequelize content
  onePost = onePost.get({ plain: true });

  // Debugging logs
  // console.log("onePost:", onePost);

  // Get all comments associated with the given post and their associated submitting users
  const comments = await Comment.findAll({
    where: {
      post_id: onePost.id,
    },
    include: [{ model: User }],
  });

  // Strip out extra sequelize content
  const plainComments = comments.map((row) => row.get({ plain: true }));
  // console.log("plainComments: ", plainComments);

  // Determine if the logged in user is the author of the post for conditional page rendering
  let sameAuthor = false;
  if (onePost.author_id === req.session.user_id) {
    sameAuthor = true;
  }

  // Render the page with post and session information
  res.render("post", {
    Post: onePost,
    comments: plainComments,
    sess: req.session,
    sameAuthor,
  });
});

// Dashboard for the user where they can make new posts
router.get("/dashboard", loginCheck, async (req, res) => {
  // console.log('\n**************\n\n**************\n\n**************\nDashboard route activated\n**************\n\n**************\n\n**************\n')

  // Get all posts from the logged in user
  let allPosts = await Post.findAll({
    where: {
      author_id: req.session.user_id,
    },
    order: [["id", "ASC"]],
    include: [{ model: User }],
  });

  // Strip out extra sequelize content
  allPosts = allPosts.map((row) => row.get({ plain: true }));

  // Debugging logs
  console.log(allPosts);

  // Render the page with posts and session info
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
