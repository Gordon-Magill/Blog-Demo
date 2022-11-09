// Importing db and core models
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models/index");

// Loading in seed data from files
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

// Defining the seeding operation
const seedDatabase = async () => {
  // Force sync the db to reset any tables
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed posts
  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  // Seed comments
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  // Terminate the process
  process.exit(0);
};

// Actually execute the seeding operation
seedDatabase();
