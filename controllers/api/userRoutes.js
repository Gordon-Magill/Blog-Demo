const router = require("express").Router();
const { User } = require("../../models/index");
const bcrypt = require("bcrypt");

// Log the user in
router.post("/login", async (req, res) => {
  // console.log("login route ACTIVATED");
  try {
    // Get the user from the db that has the same username as what was submitted in the form
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // If there is no such user (empty response from mysql) then reject the request
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Check the hash of the pw with the hashed pw in the db
    const pwTest = await userData.checkPassword(req.body.password);

    // If the hashes don't match, reject the request
    if (!pwTest) {
      res.status(400).json({
        message: "Incorrect username or password. Password failed hash check.",
      });
      return;
    }

    // Assuming the hashes did match, create a session for this user
    req.session.save(() => {
      req.session.username = req.body.username;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData });
    });
  } catch (err) {
    // If any of the above threw and error, send it back to the browser.
    console.log(err);
    res.status(400).json(err);
  }
});

// Create a new user
router.post("/create", async (req, res) => {
  // console.log("/api/user/create route was called!");
  try {
    // Determine if any users of the same name have already been made
    const sameUsername = await User.findAll({
      where: {
        username: req.body.newUsername,
      },
    });

    // console.log('sameUsername:', sameUsername)

    // If any same-named users are found, reject the signup
    if (sameUsername.length > 0) {
      res.status(401).end();
      return;
    }

    // Create the new user content
    const newUser = {
      username: req.body.newUsername,
      // password: req.body.password
    };

    // console.log("About to hash pw:", req.body.newPassword);

    // Hashing the PW
    newUser.password = await bcrypt.hash(req.body.newPassword, 10);

    // console.log("About to call User.create() with: ", newUser);
    // Actually create the new user
    const userData = await User.create(newUser);
    // console.log("Created userData:", userData);

    // Set the user as logged in with the new credentials
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData });
    });
  } catch (err) {
    // If any of the above threw an error, log and send it
    console.log(err);
    res.status(400).json(err);
  }
});

// Logging out a user
router.post("/logout", async (req, res) => {
  // If the user was logged in, actually end the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user wasn't logged in but tries to log out (somehow), then send an error
    res.status(404).end();
  }
});

// Create new user

// Get all users

// Get individual user

// Update individual user

// Delete user

module.exports = router;
