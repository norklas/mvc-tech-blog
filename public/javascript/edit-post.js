async function editFormHandler(event) {
  event.preventDefault();

  // Getting form data
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;
  // Getting id from url
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // Setting response to fetch api/posts/id then PUT method on title/post_text
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if response succeeds, then redirect to dashboard
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
