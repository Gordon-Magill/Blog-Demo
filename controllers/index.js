const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/', async (req,res) => {
    res.render('homepage', {
        sess: req.session,
    })
})

router.get('/dashboard', async (req,res) => {
    res.render('dashboard', {})
})

router.get('/loginSignUp', async (req,res) => {
    res.render('loginSignUp', {})
})

module.exports = router;