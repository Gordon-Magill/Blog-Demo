// Import models to associate
const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

// Posts can have many comments
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  // onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  // foreignKey: "post_id",
  // onDelete: "CASCADE",
});

// Users can have many posts
Post.belongsTo(User, {
  foreignKey: "author_id",
});

User.hasMany(Post, {
  foreignKey: "author_id",
  // onDelete: "CASCADE",
});

// Users can have many comments
Comment.belongsTo(User, {
  foreignKey: "author_id",
});

User.hasMany(Comment, {
  foreignKey: "author_id",
  // onDelete: "CASCADE",
});

module.exports = { Comment, Post, User };
