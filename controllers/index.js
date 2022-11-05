const router = require('express').Router();
const Post = require('../models/Post');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req,res) => {
    const allPosts = await Post.findAll()
    res.render('homepage', {
        allPosts,
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