const API_URL = "http://localhost:8080/api/auth";
const token = localStorage.getItem("token");
if (!token) location.href = "login.html";
document.getElementById("welcome").textContent =
  "Welcome, " + (localStorage.getItem("email") || "HR User");
document.getElementById("logout").addEventListener("click", async () => {
  try {
    await fetch(API_URL + "/logout", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
  } catch {
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    location.href = "login.html";
  }
});
