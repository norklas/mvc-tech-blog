async function loginFormHandler(event) {
  event.preventDefault();

  // Getting form data
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // if email and password are true, then set response to fetch api/users/login with a POST method, and set body to email/password
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // If response succeeds, then redirect to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
