const API_URL = "http://localhost:8080/api/auth";
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message");
    try {
      const response = await fetch(API_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value,
        }),
      });
      const text = await response.text();
      message.textContent = text;
      message.className = response.ok ? "success" : "";
      if (response.ok) setTimeout(() => (location.href = "login.html"), 800);
    } catch {
      message.textContent =
        "Cannot connect to Spring Boot. Check that it is running on port 8080.";
    }
  });
