const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  // Get all users
  const allUsers = User.findAll();
});

// Log the user in
router.post("/login", async (req, res) => {
  console.log("login route ACTIVATED");
  try {
    // Get the user from the db that has the same username as what was submitted in the form
    const userData = await User.findOne({where: {username: req.body.username}})

    // If there is no such user (empty response from mysql) then reject the request
    if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    // Check the hash of the pw with the hashed pw in the db
    const pwTest = await userData.checkPassword(req.body.password)

    // If the hashes don't match, reject the request
    if (!pwTest) {
        res.status(400).json({message:'Incorrect username or password. Password failed hash check.'})
        return;
    }

    req.session.save(() => {
      req.session.user_id = req.body.username;
      req.session.logged_in = true;

      res.status(200).json({user: userData});
      // res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err)
  }
});

// Create a new user
router.post('/create', async (req,res) => {
    console.log('/api/user/create route was called!')
    try {
        const newUser = {
            username: req.body.newUsername,
            // password: req.body.password
        }

        console.log('About to hash pw:', req.body.newPassword)
        newUser.password = await bcrypt.hash(req.body.newPassword, 10)

        console.log('About to call User.create() with: ',newUser)
        const userData = await User.create(newUser);
        console.log('Created userData:', userData)

        // Set the user as logged in with the new credentials
        req.session.save(() => {
            req.session.user_id = req.body.newUsername;
            req.session.logged_in = true;
      
            res.status(200).json({user: userData});
          });


    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// Create new user

// Get all users

// Get individual user

// Update individual user

// Delete user

module.exports = router;
