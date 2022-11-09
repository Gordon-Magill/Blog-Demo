async function postSubmission() {
  const postContent = $("#newPostTextArea").val().trim();
  const postTitle = $("#newPostTitleInput").val().trim();
  console.log("Trying to submit post for the following text:", postContent);

  if (postContent.length > 1) {
    const postRequest = await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({ postContent, postTitle }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (postRequest.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post sumission failed, bad server response to page");
    }
  } else {
    alert("No text in post content.");
  }
}

async function postComment() {
  console.log("\n\npostComment route activated!\n\n");
  const commentContent = $("#newCommentTextArea").val().trim();
  let post_id = window.location.href.split("/");
  post_id = parseInt(post_id[post_id.length - 1].split("?")[0]) + 1;

  if (commentContent.length > 1) {
    console.log(
      "Comment content to send for creation:",
      JSON.stringify({
        content: commentContent,
        post_id,
      })
    );

    const postRequest = await fetch("/api/comment/create", {
      method: "POST",
      body: JSON.stringify({
        content: commentContent,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (postRequest.ok) {
      document.location.replace(window.location.href);
    } else {
      alert("Comment sumission failed, bad server response to page");
    }
  }
}

async function editPost() {
  // event.preventDefault()
  // console.log('editPost public js was called')
  const postContent = $("#editPostTextArea").val().trim();
  const postTitle = $("#editPostTitleInput").val().trim();
  const editButton = $("#editPostButton");
  console.log("Trying to edit post for the following text:", postContent);

  if (postContent.length > 1) {
    // console.log('About to make edit request...')
    const editRequest = await fetch("/api/post/edit", {
      method: "PUT",
      body: JSON.stringify({
        postContent,
        postTitle,
        postID: editButton.attr('data-post'),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (editRequest.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post edit failed, bad server response to page");
    }
  } else {
    alert("No text in post content.");
  }
}

async function deletePost(){
  const deleteButton = $("#deletePostButton");
  const deletePost = await fetch("/api/post/delete", {
    method: "DELETE",
    body: JSON.stringify({
      postID: deleteButton.attr('data-post'),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (deletePost.ok) {
    document.location.replace("/dashboard");
    } else {
      alert("Post deletion failed, bad server response to page");
  }
}

const submissionButton = $("#submitPostButton");
submissionButton.on("click", postSubmission);

const commentButton = $("#submitCommentButton");
commentButton.on("click", postComment);

const editButton = $("#editPostButton");
editButton.on("click", editPost);

const deleteButton = $("#deletePostButton");
deleteButton.on("click", deletePost)
