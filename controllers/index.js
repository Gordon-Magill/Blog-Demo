const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req,res) => {
    let allPosts = await Post.findAll()
    allPosts = allPosts.map(row => row.get({plain:true}))
    console.log(allPosts)
    // allPosts = allPosts.get({plain: true})
    res.render('homepage', {
        allPosts,
        sess: req.session,
    })
})

router.get('/post/:id', async (req,res) => {
    let onePost = await Post.findOne({
        where: {
            id: req.params.id+1
        },
        include: [{model: Comment}]
    })
    onePost = onePost.get({plain:true})
    console.log('onePost:',onePost)
    res.render('post', {
        onePost,
        sess: req.session,
    })
})

router.get('/dashboard', async (req,res) => {
    res.render('dashboard', {
        sess: req.session,
    })
})

router.get('/loginSignUp', async (req,res) => {
    // If the user is already logged in, just dump them back to the home page
    if (req.session.logged_in) {
        res.render('homepage',{
            sess: req.session
        })
    } else {
        // If user isn't logged in, send them to the login/signup page
        res.render('loginSignUp', {
            sess: req.session,
        })
    }

})

module.exports = router;