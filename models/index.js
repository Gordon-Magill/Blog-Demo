// Import models to associate
const Comment = require('./Comment')
const Post = require('./Post')
// const PostComment = require('./PostComment')
const User = require('./User')


Comment.belongsTo(Post,{
    // onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
    onDelete: 'CASCADE'
})

Post.hasOne(User, {

})

User.belongsToMany(Post, {
    onDelete: 'CASCADE'
})

User.belongsToMany(Comment, {
    onDelete: 'CASCADE'
})

module.exports = { Comment, Post, User };