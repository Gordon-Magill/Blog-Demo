// Import models to associate
const Comment = require('./Comment')
const Post = require('./Post')
const User = require('./User')

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Post,{
    foreignKey: 'post_id'
})

// Post.hasOne(User, {

// })

// User.belongsToMany(Post, {
//     onDelete: 'CASCADE'
// })

// User.belongsToMany(Comment, {
//     onDelete: 'CASCADE'
// })

module.exports = { Comment, Post, User };