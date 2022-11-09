// Logs a user out
async function logoutHelper() {
  // Make the request to the server to log the current user out
  const logoutRequest = await fetch("/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Assuming there were no problems, send the user back to the home page
  if (logoutRequest.ok) {
    document.location.replace("/");
  } else {
    alert("Logout failed. Please contact site admin.");
  }
}

// Attaching event handler to the logout element
const logoutThings = $("#logout");
logoutThings.on("click", logoutHelper);
