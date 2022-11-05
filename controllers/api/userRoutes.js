const router = require('express').Router();
const User = require('../../models/User')

router.get('/', async (req,res) => {
    // Get all users
    const allUsers = User.findAll()

})

// Create new user

// Get all users

// Get individual user

// Update individual user

// Delete user

module.exports = router