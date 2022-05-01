async function newFormHandler(event) {
  event.preventDefault();

  // Getting data from forms
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  // Setting reponse to fetch api/posts then POST method, and then posting title/post_text
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if response succeeds, then redirect to dashboard, else alert with status text
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
