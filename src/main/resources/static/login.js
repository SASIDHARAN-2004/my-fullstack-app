const API_URL = "http://localhost:8080/api/auth";
if (localStorage.getItem("token")) location.href = "home.html";
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message");
  try {
    const response = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      message.textContent = data.message || "Login failed";
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", email.value.trim());
    location.href = "home.html";
  } catch {
    message.textContent =
      "Cannot connect to Spring Boot. Check that it is running on port 8080.";
  }
});
