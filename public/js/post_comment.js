async function postSubmission() {
  const postContent = $("#newPostTextArea").val().trim();
  console.log('Trying to submit post for the following text:',postContent)

  if (postContent.length > 1) {
    const postRequest = await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({postContent}),
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (postRequest.ok) {
        document.location.replace("/");
    } else {
        alert('Post sumission failed, bad server response to page')
    }
    
  } else {
    alert('No text in post content.')
  }
}


const submissionButton = $("#submitPostButton");
submissionButton.on('click', postSubmission)