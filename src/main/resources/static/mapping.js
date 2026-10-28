const BASE = "http://localhost:8080",
  token = localStorage.getItem("token"),
  headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
if (!token) location.href = "login.html";
let requirements = [],
  students = [],
  selectedStudents = new Set();
const esc = (x) =>
  String(x ?? "")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const requirementLabel = (x) =>
    `${x.id} - ${x.companyName} | ${x.branchDealCode}`,
  studentLabel = (x) => `${x.id} - ${x.name} | ${x.email}`;
function renderRequirements() {
  const id = requirementFilterId.value.trim();
  const company = requirementFilterCompany.value.toLowerCase().trim();
  const dealCode = requirementFilterDealCode.value.toLowerCase().trim();
  const shown = requirements.filter((r) =>
    (!id || String(r.id).includes(id)) &&
    (!company || String(r.companyName).toLowerCase().includes(company)) &&
    (!dealCode || String(r.branchDealCode).toLowerCase().includes(dealCode))
  );
  requirementRows.innerHTML = shown
    .map(
      (r) =>
        `<tr><td><input class="requirement-check square-check" type="checkbox" value="${r.id}"></td><td>${esc(r.id)}</td><td>${esc(r.branchDealCode)}</td><td>${esc(r.companyName)}</td><td>${esc(r.jobTitle)}</td><td>${esc(r.jobLocation)}</td><td>${esc(r.interviewDate)}</td><td>${esc(r.noOfVacantPositions)}</td><td>${esc(r.modeOfInterview)}</td></tr>`,
    )
    .join("");
  document.querySelectorAll(".requirement-check").forEach(
    (box) =>
      (box.onchange = () => {
        if (box.checked) {
          document.querySelectorAll(".requirement-check").forEach((x) => {
            if (x !== box) x.checked = false;
          });
          let r = requirements.find((x) => String(x.id) === box.value);
          requirementId.value = box.value;
          requirementPicker.textContent = requirementLabel(r);
          requirementTable.classList.add("hidden");
        }
      }),
  );
}
function renderStudents() {
  let id = searchId.value.trim(),
    email = searchEmail.value.toLowerCase().trim(),
    contact = searchContact.value.trim();
  let shown = students.filter(
    (s) =>
      (!id || String(s.id).includes(id)) &&
      (!email || s.email.toLowerCase().includes(email)) &&
      (!contact || String(s.contactNumber).includes(contact)),
  );
  studentRows.innerHTML = shown.length
    ? shown
        .map(
          (s) =>
            `<tr><td><input class="student-check square-check" type="checkbox" value="${s.id}" ${selectedStudents.has(String(s.id)) ? "checked" : ""}></td><td>${s.id}</td><td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.contactNumber)}</td><td>${esc(s.yop)}</td></tr>`,
        )
        .join("")
    : "<tr><td colspan='6'>No students found.</td></tr>";
  document.querySelectorAll(".student-check").forEach(
    (box) =>
      (box.onchange = () => {
        box.checked
          ? selectedStudents.add(box.value)
          : selectedStudents.delete(box.value);
        updateCount();
      }),
  );
}
function updateCount() {
  let n = selectedStudents.size;
  selectedCount.textContent = `${n} student${n === 1 ? "" : "s"} selected`;
  studentPicker.textContent = n
    ? `${n} student${n === 1 ? "" : "s"} selected`
    : "Click to select students";
}
requirementPicker.onclick = () => requirementTable.classList.toggle("hidden");
studentPicker.onclick = () => studentTable.classList.toggle("hidden");
[requirementFilterId, requirementFilterCompany, requirementFilterDealCode].forEach(
  (input) => (input.oninput = renderRequirements),
);
resetRequirementFilters.onclick = () => {
  requirementFilterId.value = "";
  requirementFilterCompany.value = "";
  requirementFilterDealCode.value = "";
  renderRequirements();
};
[searchId, searchEmail, searchContact].forEach(
  (input) => (input.oninput = renderStudents),
);
resetStudentFilters.onclick = () => {
  searchId.value = "";
  searchEmail.value = "";
  searchContact.value = "";
  renderStudents();
};
let selectedViewRequirementId = null;
function renderViewRequirements() {
  const id = viewRequirementId.value.trim();
  const company = viewCompanyName.value.toLowerCase().trim();
  const dealCode = viewDealCode.value.toLowerCase().trim();
  const shown = requirements.filter((r) => (!id || String(r.id).includes(id)) && (!company || String(r.companyName).toLowerCase().includes(company)) && (!dealCode || String(r.branchDealCode).toLowerCase().includes(dealCode)));
  viewRequirementRows.innerHTML = shown.length ? shown.map((r) => `<tr><td><input type="checkbox" class="view-requirement-check square-check" value="${r.id}" ${String(r.id) === String(selectedViewRequirementId) ? "checked" : ""}></td><td>${esc(r.id)}</td><td>${esc(r.branchDealCode)}</td><td>${esc(r.companyName)}</td><td>${esc(r.jobTitle)}</td><td>${esc(r.jobLocation)}</td><td>${esc(r.interviewDate)}</td><td>${esc(r.noOfVacantPositions)}</td><td>${esc(r.modeOfInterview)}</td></tr>`).join("") : "<tr><td colspan='9'>No requirements found.</td></tr>";
  document.querySelectorAll(".view-requirement-check").forEach((box) => box.onchange = () => { if (box.checked) { document.querySelectorAll(".view-requirement-check").forEach((other) => { if (other !== box) other.checked = false; }); selectedViewRequirementId = box.value; loadMappedStudents(); } else { selectedViewRequirementId = null; mappedStudentsTable.innerHTML = ""; } });
}
[viewRequirementId, viewCompanyName, viewDealCode].forEach((input) => input.oninput = renderViewRequirements);
resetViewFilters.onclick = () => { viewRequirementId.value = ""; viewCompanyName.value = ""; viewDealCode.value = ""; renderViewRequirements(); };
function renderRemoveRequirements() {
  const id = removeReqFilterId.value.trim(), company = removeReqFilterCompany.value.toLowerCase().trim(), deal = removeReqFilterDeal.value.toLowerCase().trim();
  const shown = requirements.filter((r) => (!id || String(r.id).includes(id)) && (!company || String(r.companyName).toLowerCase().includes(company)) && (!deal || String(r.branchDealCode).toLowerCase().includes(deal)));
  removeRequirementRows.innerHTML = shown.length ? shown.map((r) => `<tr><td><input class="remove-requirement-check square-check" type="checkbox" value="${r.id}"></td><td>${esc(r.id)}</td><td>${esc(r.branchDealCode)}</td><td>${esc(r.companyName)}</td><td>${esc(r.jobTitle)}</td><td>${esc(r.jobLocation)}</td><td>${esc(r.interviewDate)}</td><td>${esc(r.noOfVacantPositions)}</td><td>${esc(r.modeOfInterview)}</td></tr>`).join("") : "<tr><td colspan='9'>No requirements found.</td></tr>";
  document.querySelectorAll(".remove-requirement-check").forEach((box) => box.onchange = () => { if (box.checked) { document.querySelectorAll(".remove-requirement-check").forEach((other) => { if (other !== box) other.checked = false; }); removeRequirementId.value = box.value; removeRequirementTable.classList.add("hidden"); } });
}
function renderRemoveStudents() {
  const id = removeStudentFilterId.value.trim(), email = removeStudentFilterEmail.value.toLowerCase().trim(), contact = removeStudentFilterContact.value.trim();
  const shown = students.filter((s) => (!id || String(s.id).includes(id)) && (!email || String(s.email).toLowerCase().includes(email)) && (!contact || String(s.contactNumber).includes(contact)));
  removeStudentRows.innerHTML = shown.length ? shown.map((s) => `<tr><td><input class="remove-student-check square-check" type="checkbox" value="${s.id}"></td><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.contactNumber)}</td><td>${esc(s.yop)}</td></tr>`).join("") : "<tr><td colspan='6'>No students found.</td></tr>";
  document.querySelectorAll(".remove-student-check").forEach((box) => box.onchange = () => { if (box.checked) { document.querySelectorAll(".remove-student-check").forEach((other) => { if (other !== box) other.checked = false; }); removeStudentId.value = box.value; removeStudentTable.classList.add("hidden"); } });
}
removeRequirementId.onclick = () => removeRequirementTable.classList.toggle("hidden");
removeStudentId.onclick = () => removeStudentTable.classList.toggle("hidden");
[removeReqFilterId, removeReqFilterCompany, removeReqFilterDeal].forEach((input) => input.oninput = renderRemoveRequirements);
[removeStudentFilterId, removeStudentFilterEmail, removeStudentFilterContact].forEach((input) => input.oninput = renderRemoveStudents);
resetRemoveRequirementFilters.onclick = () => { removeReqFilterId.value = ""; removeReqFilterCompany.value = ""; removeReqFilterDeal.value = ""; removeRequirementId.value = ""; renderRemoveRequirements(); };
resetRemoveStudentFilters.onclick = () => { removeStudentFilterId.value = ""; removeStudentFilterEmail.value = ""; removeStudentFilterContact.value = ""; removeStudentId.value = ""; renderRemoveStudents(); };
removeMappedStudent.onclick = async () => {
  const reqId = removeRequirementId.value.trim(), studentId = removeStudentId.value.trim();
  if (!reqId || !studentId) { removeMessage.textContent = "Enter both Requirement ID and Student ID."; return; }
  try { const response = await fetch(BASE + `/api/Requirement/removeStd?reqId=${encodeURIComponent(reqId)}&sid=${encodeURIComponent(studentId)}`, { method: "DELETE", headers }); if (!response.ok) throw 0; removeMessage.textContent = await response.text(); removeMessage.className = "success"; } catch { removeMessage.textContent = "Could not remove this student mapping."; }
};
async function loadMappedStudents() {
  if (!selectedViewRequirementId) { viewMessage.textContent = "Select one requirement from the table first."; return; }
  try { const response = await fetch(BASE + "/api/Requirement/getStudent/" + selectedViewRequirementId, { headers }); if (!response.ok) throw 0; const mapped = await response.json(); mappedStudentsTable.innerHTML = mapped.length ? `<table class="mapped-table"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Contact Number</th><th>Degree</th><th>Year of Passing</th></tr></thead><tbody>${mapped.map((s) => `<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.contactNumber)}</td><td>${esc(s.degree)}</td><td>${esc(s.yop)}</td></tr>`).join("")}</tbody></table>` : "<p>No students are mapped to this requirement.</p>"; viewMessage.textContent = ""; } catch { viewMessage.textContent = "Could not load mapped students."; }
}
async function setup() {
  try {
    let [rr, sr] = await Promise.all([
      fetch(BASE + "/api/Requirement", { headers }),
      fetch(BASE + "/api/student", { headers }),
    ]);
    if (!rr.ok || !sr.ok) throw 0;
    requirements = await rr.json();
    students = await sr.json();
    renderRequirements();
    renderStudents();
    renderViewRequirements();
    renderRemoveRequirements();
    renderRemoveStudents();
    let id = new URLSearchParams(location.search).get("rid");
    if (id) {
      let box = [...document.querySelectorAll(".requirement-check")].find(
        (x) => x.value === id,
      );
      if (box) {
        box.checked = true;
        box.dispatchEvent(new Event("change"));
      }
    }
  } catch {
    message.textContent = "Could not load students or requirements.";
  }
}
mapForm.onsubmit = async (event) => {
  event.preventDefault();
  if (!requirementId.value)
    return (message.textContent = "Select a requirement from the table.");
  if (!selectedStudents.size)
    return (message.textContent =
      "Select at least one student from the table.");
  try {
    let responses = await Promise.all(
      [...selectedStudents].map((sid) =>
        fetch(
          BASE +
            `/api/Requirement/mapstd?rid=${requirementId.value}&sid=${sid}`,
          { method: "POST", headers },
        ),
      ),
    );
    let failed = responses.filter((r) => !r.ok).length;
    message.textContent = failed
      ? `${selectedStudents.size - failed} student(s) mapped; ${failed} failed.`
      : `${selectedStudents.size} student(s) mapped successfully.`;
    message.className = failed ? "" : "success";
  } catch {
    message.textContent = "Mapping failed.";
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
setup();
