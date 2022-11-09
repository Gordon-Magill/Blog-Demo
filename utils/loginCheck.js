// Route middleware that verifies login status for pages that require it
function loginCheck(req, res, next) {
  // If the user isn't logged in, send them to the login page
  // console.log(
  //   "\n**************\n\n**************\n\n**************\nloginCheck middleware activated\n**************\n\n**************\n\n**************\n"
  // );
  if (!req.session.logged_in) {
    // console.log("Forwarding to login page since user is not logged in...");
    res.status(304).redirect("/loginSignUp");
    return;
  } else {
    // If they are logged in, proceed normally
    // console.log("\nloginCheck passed with valid session...\n");
    next();
  }
}

module.exports = loginCheck;
