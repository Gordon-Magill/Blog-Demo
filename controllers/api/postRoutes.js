const router = require('express').Router();
const { NOW } = require('sequelize');
const Post = require('../../models/Post')
const User = require('../../models/User')
const moment = require('moment')


router.get('/', async (req,res) => [
    // Get all posts
])

// Create new post
router.post('/post/create', async (req,res) => {
    try {
        let writingUser = await User.findOne({
            where: {
                username: req.session.user_id
            }
        })
    
        writingUser = writingUser.get({plain: true})
        console.log('writingUser: ',writingUser)
    
        const newPost = await Post.create({
            author_id: writingUser.id,
            creation_time: Date.now(),
            content: req.body.postContent
        })
    
        res.status(200).json(newPost)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
    
})

// Get all posts

// Get individual post

// Update individual post

// Delete post

module.exports = router