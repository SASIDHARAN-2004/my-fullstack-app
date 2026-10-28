const BASE = "http://localhost:8080",
  token = localStorage.getItem("token"),
  auth = { Authorization: "Bearer " + token },
  json = { ...auth, "Content-Type": "application/json" };
if (!token) location = "login.html";
const v = (id) => document.getElementById(id).value.trim(),
  msg = (id, t, ok = false) => {
    let e = document.getElementById(id);
    e.textContent = t;
    e.className = ok ? "success" : "";
  },
  esc = (x) =>
    String(x ?? "")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
async function get(p) {
  let r = await fetch(BASE + p, { headers: auth });
  if (!r.ok) throw 0;
  return r.json();
}
const detail = (a, b) => `<p><b>${a}:</b> ${esc(b)}</p>`;
function render(d) {
  let a = Array.isArray(d) ? d : [d];
  list.innerHTML = a.length
    ? a
        .map(
          (r) =>
            `<article class="requirement-card"><h3>${esc(r.companyName)} — ${esc(r.jobTitle)}</h3><div class="requirement-details">${detail("Requirement ID", r.id)}${detail("Branch Deal Code", r.branchDealCode)}${detail("Company Name", r.companyName)}${detail("Job Title", r.jobTitle)}${detail("Designation", r.designation)}${detail("Job Location", r.jobLocation)}${detail("Skills Required", r.skillsRequired)}${detail("Vacant Positions", r.noOfVacantPositions)}${detail("Candidates Required", r.noOfCandidatesRequired)}${detail("Interview Date", r.interviewDate)}${detail("Gender Specification", r.genderSpecification)}${detail("Mode of Interview", r.modeOfInterview)}${detail("Minimum 10th %", r.tenthPercentMin)}${detail("Minimum 12th %", r.twelfthPercentMin)}${detail("Minimum Degree %", r.degreePercentMin)}${detail("Qualification Type", r.qualificationType)}</div><button class="row danger" onclick="del(${r.id})">Delete Requirement</button></article>`,
        )
        .join("")
    : "<p>No requirements found.</p>";
}
async function load() {
  try {
    render(await get("/api/Requirement"));
  } catch {
    msg("message", "Unable to load requirements.");
  }
}
requirementForm.onsubmit = async (e) => {
  e.preventDefault();
  let b = {
    branchDealCode: v("branchDealCode"),
    companyName: v("companyName"),
    jobTitle: v("jobTitle"),
    designation: v("designation"),
    jobLocation: v("jobLocation"),
    skillsRequired: v("skillsRequired"),
    noOfVacantPositions: v("noOfVacantPositions"),
    noOfCandidatesRequired: v("noOfCandidatesRequired"),
    interviewDate: v("interviewDate"),
    genderSpecification: v("genderSpecification"),
    modeOfInterview: v("modeOfInterview"),
    tenthPercentMin: Number(v("tenthPercentMin")),
    twelfthPercentMin: Number(v("twelfthPercentMin")),
    degreePercentMin: Number(v("degreePercentMin")),
    qualificationType: v("qualificationType"),
  };
  try {
    let r = await fetch(BASE + "/api/Requirement", {
      method: "POST",
      headers: json,
      body: JSON.stringify(b),
    });
    if (!r.ok) throw 0;
    msg("message", "Requirement saved.", true);
    e.target.reset();
    load();
  } catch {
    msg("message", "Could not save requirement.");
  }
};
document.querySelectorAll("[data-type]").forEach(
  (b) =>
    (b.onclick = async () => {
      let t = b.dataset.type,
        x = v(
          t === "id"
            ? "filterId"
            : t === "company"
              ? "filterCompany"
              : "filterBranch",
        );
      if (!x) return msg("filterMessage", "Enter a value first.");
      try {
        render(
          await get(
            t === "id"
              ? `/api/Requirement/${x}`
              : t === "company"
                ? `/api/Requirement/company/${encodeURIComponent(x)}`
                : `/api/Requirement/branch/${encodeURIComponent(x)}`,
          ),
        );
        msg("filterMessage", "");
      } catch {
        msg("filterMessage", "No matching requirement found.");
      }
    }),
);
showAll.onclick = load;
async function del(id) {
  if (!confirm("Delete requirement " + id + "?")) return;
  try {
    let r = await fetch(BASE + "/api/Requirement/" + id, {
      method: "DELETE",
      headers: auth,
    });
    if (!r.ok) throw 0;
    msg("filterMessage", await r.text(), true);
    load();
  } catch {
    msg("filterMessage", "Delete failed.");
  }
}
window.del = del;
deleteRequirementButton.onclick = () => {
  let id = v("deleteRequirementId");
  if (!id) return msg("filterMessage", "Enter a requirement ID to delete.");
  del(id);
};
logout.onclick = async () => {
  try {
    await fetch(BASE + "/api/auth/logout", { method: "POST", headers: auth });
  } finally {
    localStorage.clear();
    location = "login.html";
  }
};
load();
