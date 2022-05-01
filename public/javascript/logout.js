async function logout() {
  // Fetches api/users/logout with a POST method
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // if response succeeds, then redirect to homepage
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
