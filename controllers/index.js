const router = require('express').Router();
const {Post, Comment, User} = require('../models/index')
const moment = require('moment')

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req,res) => {
    let allPosts = await Post.findAll({
        include: [{model: User}],
        order: [["id", "ASC"]]
      })
    allPosts = allPosts.map(row => row.get({plain:true}))
    console.log(allPosts)
    // allPosts = allPosts.get({plain: true})
    res.render('homepage', {
        allPosts,
        // formattedTime: allPosts.map(post => moment(post.creation_time).format('MMM DD, Y')),
        sess: req.session,
    })
})

router.get('/post/:id', async (req,res) => {
    console.log('Post page rendering route called!')
    const onePost = await Post.findOne({
        where: {
            id: parseInt(req.params.id)+1
        },
        include: [{model: Comment}]
    })
    console.log('onePost:', onePost)
    plainPost = onePost.get({plain:true})
    console.log('plainPost:',plainPost)
    res.render('post', {
        Post: plainPost,
        sess: req.session,
    })
})

router.get('/dashboard', async (req,res) => {
    // If the user isn't logged in, dump them back to the home page
    if (!req.session.logged_in) {
        res.status(403).redirect("/loginSignUp")
        return;
    }

    console.log(req.session)
    let allPosts = await Post.findAll({
        where: {
            author_id: req.session.user_id
        },
        order: [["id", "ASC"]]
      })
    allPosts = allPosts.map(row => row.get({plain:true}))
    console.log(allPosts)
    // allPosts = allPosts.get({plain: true})
    res.render('dashboard', {
        allPosts,
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