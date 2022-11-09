// Import models to associate
const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  // onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  // foreignKey: "post_id",
  // onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "author_id",
});

User.hasMany(Post, {
  foreignKey: "author_id",
  // onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "author_id",
});

User.hasMany(Comment, {
  foreignKey: "author_id",
  // onDelete: "CASCADE",
});

module.exports = { Comment, Post, User };
