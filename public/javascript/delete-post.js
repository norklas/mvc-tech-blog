async function deleteFormHandler(event) {
  event.preventDefault();

  // Getting id from the url
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // Setting reponse to fetch api/posts/id then method DELETE on id
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
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
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
