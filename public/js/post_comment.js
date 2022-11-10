// Function to facilitate making new posts (submissions)
async function postSubmission() {
  // Get post content from the user completed fields
  const postContent = $("#newPostTextArea").val().trim();
  const postTitle = $("#newPostTitleInput").val().trim();
  // console.log("Trying to submit post for the following text:", postContent);

  // Only continue if the body of the post has meaningful content
  // Technically could have done this with sequelize validation, but oh well
  if (postContent.length > 1) {
    // Send the request to the backend to create the new post
    const postRequest = await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({ postContent, postTitle }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the new post was created successfully, send the user back to the dashboard to see it
    if (postRequest.ok) {
      // Add a little delay so that the Heroku deployed version actually works - damn you latency
      setTimeout(() => {
        document.location.replace("/dashboard")
      },2000)
    } else {
      alert("Post sumission failed, bad server response to page");
    }
  } else {
    alert("No text in post content.");
  }
}

// Function to facilitate making new comments
async function postComment() {
  // event.preventDefault();
  // console.log(
  //   "\n****************\n\n****************\n\n****************\npostComment route activated!\n****************\n\n****************\n\n****************\n"
  // );

  // Get the post content from the user supplied field
  const commentContent = $("#newCommentTextArea").val().trim();

  // Get the post information from a handy embedded data attribute in handlebars
  let post_id = $("#submitCommentButton").attr("data-post");

  // Only proceed if there's a substantive comment
  if (commentContent.length > 1) {
    // console.log(
    //   "Comment content to send for creation:",
    //   JSON.stringify({
    //     content: commentContent,
    //     post_id,
    //   })
    // );

    // Send the request to the backend to create a new comment
    const newComment = await fetch("/api/comment/create", {
      method: "POST",
      body: JSON.stringify({
        content: commentContent,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the comment was created successfully, reload the page to show it
    if (newComment.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Comment sumission failed, bad server response to page");
    }
  }
}

// Function to facilitate editing posts
async function editPost() {
  // event.preventDefault()
  // console.log('editPost public js was called')

  // Get updated content from prepopulated fields
  const postContent = $("#editPostTextArea").val().trim();
  const postTitle = $("#editPostTitleInput").val().trim();
  const editButton = $("#editPostButton");
  // console.log("Trying to edit post for the following text:", postContent);

  // Only proceed if the user submits a non-empty body of the post
  if (postContent.length > 1) {
    // console.log('About to make edit request...')

    // Actually making the request to the backend to edit the post with the newly supplied info
    const editRequest = await fetch("/api/post/edit", {
      method: "PUT",
      body: JSON.stringify({
        postContent,
        postTitle,
        postID: editButton.attr("data-post"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the edit was done OK, send the user back to the dashboard
    if (editRequest.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post edit failed, bad server response to page");
    }
  } else {
    alert("No text in post content.");
  }
}

// Function to facilitate deleting posts
async function deletePost() {
  // Grab the correct event handler button that has post information encoded in it
  const deleteButton = $("#deletePostButton");

  // Make the request to the backend to do the post deletion
  const deletePost = await fetch("/api/post/delete", {
    method: "DELETE",
    body: JSON.stringify({
      postID: deleteButton.attr("data-post"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // If the deletion was done successfully, send the user back to the dashboard to see that the post is gone
  if (deletePost.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Post deletion failed, bad server response to page");
  }
}

// Adding event handlers to buttons
const submissionButton = $("#submitPostButton");
submissionButton.on("click", postSubmission);

const commentButton = $("#submitCommentButton");
commentButton.on("click", postComment);

const editButton = $("#editPostButton");
editButton.on("click", editPost);

const deleteButton = $("#deletePostButton");
deleteButton.on("click", deletePost);
