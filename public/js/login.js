async function loginHelper(event) {
  event.preventDefault();
  console.log("loginHelper triggered!");
  // Stop form submission from reloading the page

  // Get values from the form
  const username = $("#userFieldLogin").val().trim();
  const password = $("#passwordFieldLogin").val().trim();
  console.log("username:", username);
  console.log("password:", password);

  // If both credentials were supplied, make the login request to the server
  if (username && password) {
    const loginRequest = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(loginRequest);

    // If the supplied credentials were OK, send the user back to the home page
    if (loginRequest.ok) {
      document.location.replace("/");
    } else {
      alert("Bad login credentials, please try again");
    }
  }
}

async function signupHelper(event) {
  // Stop form submission from reloading the page
  event.preventDefault();

  // Get credentials from signup form
  const newUsername = $("#userFieldSignUp").val().trim();
  const newPassword = $("#passwordFieldSignUp").val().trim();

  //   Send user creation request to server using credentials
  if (newUsername && newPassword) {
    const newUser = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify({ newUsername, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(
      "\n****************\n\n****************\n\n****************\nnewUser:",
      newUser,
      "\n****************\n\n****************\n\n****************\n"
    );

    // Assuming the credentials passed validation, send the user back to the homepage
    // ASSUMES CREATION ALSO LOGS IN THE USER
    console.log(newUser);
    if (newUser.ok) {
      document.location.replace("/");
    } else {
      let errmsg =
        "Credentials did not meet required criteria. Please try again.";
      errmsg = `${errmsg}+\nServer says: ${newUser.errmsg}`;

      alert(errmsg);
    }
  }
}

const loginButton = $("#loginButton");
loginButton.on("click", loginHelper);

const signupButton = $("#signupButton");
signupButton.on("click", signupHelper);
