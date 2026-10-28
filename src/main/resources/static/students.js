const BASE = "http://localhost:8080",
  token = localStorage.getItem("token"),
  headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
if (!token) location = "login.html";
const safe = (x) =>
  String(x ?? "")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const notice = (id, text, ok = false) => {
  let e = document.getElementById(id);
  e.textContent = text;
  e.className = ok ? "success" : "";
};
function render(data) {
  const a = Array.isArray(data) ? data : [data];
  list.innerHTML = a.length
    ? `<table><tr><th>ID</th><th>Name</th><th>Email</th><th>Contact</th><th>Degree</th><th>Masters</th><th>10th%</th><th>12th%</th><th>Degree%</th><th>Masters%</th><th>YOP</th></tr>${a.map((s) => `<tr><td>${s.id}</td><td>${safe(s.name)}</td><td>${safe(s.email)}</td><td>${s.contactNumber}</td><td>${safe(s.degree)}</td><td>${safe(s.masters)}</td><td>${s.tenthPercent}</td><td>${s.twelfthPercent}</td><td>${s.degreePercent}</td><td>${s.mastersPercent}</td><td>${safe(s.yop)}</td></tr>`).join("")}</table>`
    : "<p>No students found.</p>";
}
async function load() {
  try {
    const r = await fetch(BASE + "/api/student", { headers });
    if (!r.ok) throw 0;
    render(await r.json());
  } catch {
    notice("message", "Unable to load students.");
  }
}
studentForm.onsubmit = async (event) => {
  event.preventDefault();
  const b = {
    name: document.getElementById("name").value.trim(),
    contactNumber: Number(document.getElementById("contactNumber").value),
    email: document.getElementById("email").value.trim(),
    degree: document.getElementById("degree").value.trim(),
    masters: document.getElementById("masters").value.trim(),
    tenthPercent: Number(document.getElementById("tenthPercent").value),
    twelfthPercent: Number(document.getElementById("twelfthPercent").value),
    degreePercent: Number(document.getElementById("degreePercent").value),
    mastersPercent: Number(document.getElementById("mastersPercent").value),
    yop: document.getElementById("yop").value.trim(),
  };
  try {
    const r = await fetch(BASE + "/api/student", {
      method: "POST",
      headers,
      body: JSON.stringify(b),
    });
    if (!r.ok) throw 0;
    notice("message", "Student saved successfully.", true);
    event.target.reset();
    load();
  } catch {
    notice(
      "message",
      "Could not save student. Check that Spring Boot is running and your token is valid.",
    );
  }
};
document.querySelectorAll("[data-search]").forEach(
  (button) =>
    (button.onclick = async () => {
      const type = button.dataset.search,
        id =
          type === "id"
            ? filterId.value.trim()
            : type === "email"
              ? filterEmail.value.trim()
              : filterContact.value.trim();
      if (!id) return notice("filterMessage", "Enter a value first.");
      const path =
        type === "id"
          ? `/api/student/getByid/${encodeURIComponent(id)}`
          : type === "email"
            ? `/api/student/getbyemail/${encodeURIComponent(id)}`
            : `/api/student/getbyph/${encodeURIComponent(id)}`;
      try {
        const r = await fetch(BASE + path, { headers });
        if (!r.ok) throw 0;
        render(await r.json());
        notice("filterMessage", "");
      } catch {
        notice("filterMessage", "Student not found.");
      }
    }),
);
showAll.onclick = load;
deleteButton.onclick = async () => {
  const id = deleteId.value.trim();
  if (!id) return notice("filterMessage", "Enter a student ID to delete.");
  if (!confirm("Delete student ID " + id + "?")) return;
  try {
    const r = await fetch(BASE + `/api/student/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers,
    });
    if (!r.ok) throw 0;
    notice("filterMessage", await r.text(), true);
    deleteId.value = "";
    load();
  } catch {
    notice(
      "filterMessage",
      "Delete failed. Add @PathVariable to the backend delete method.",
    );
  }
};
logout.onclick = async () => {
  try {
    await fetch(BASE + "/api/auth/logout", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
  } finally {
    localStorage.clear();
    location = "login.html";
  }
};
load();
