function loginCheck(req,res,next) {
    if(!req.session.loggedIn) {
        res.redirect('/login')
    } else {
        console.log('\nloginCheck passed with valid session...\n')
        next()
    }
}

module.exports = {
    loginCheck,
}