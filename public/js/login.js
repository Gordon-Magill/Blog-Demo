async function loginHelper(event) {
  // Stop form submission from reloading the page
  event.preventDefault();

  // Get values from the form
  const username = $("#userFieldLogin").value.trim();
  const password = $("#passwordFieldLogin").value.trim();

  // If both credentials were supplied, make the login request to the server
  if (username && password) {
    const loginRequest = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the supplied credentials were OK, send the user back to the home page
    if (loginRequest.isApproved) {
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
  const newUsername = $("#userFieldSignUp").value.trim();
  const newPassword = $("#passwordFieldSignUp").value.trim();

  //   Send user creation request to server using credentials
  if (newUsername && newPassword) {
    const createRequest = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify({ newUsername, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Assuming the credentials passed validation, send the user back to the homepage
    // ASSUMES CREATION ALSO LOGS IN THE USER
    if (createRequest.isApproved) {
      document.location.replace("/");
    } else {
      alert("Credentials did not meet required criteria. Please try again.");
    }
  }
}

const loginButton = $("#loginButton");
loginButton.on("click", loginHelper);

const signupButton = $("#signupButton");
signupButton.on("click", signupHelper);
