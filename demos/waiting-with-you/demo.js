const candidateTab = document.querySelector("#candidate-tab");
const recruiterTab = document.querySelector("#recruiter-tab");
const candidateView = document.querySelector("#candidate-view");
const recruiterView = document.querySelector("#recruiter-view");
const refreshButton = document.querySelector("#refresh-button");
const refreshCount = document.querySelector("#refresh-count");
const statusTitle = document.querySelector("#status-title");
const statusMessage = document.querySelector("#status-message");
const supportOptIn = document.querySelector("#support-opt-in");

let checks = 0;

function showView(view) {
  const showCandidate = view === "candidate";
  candidateView.classList.toggle("hidden", !showCandidate);
  recruiterView.classList.toggle("hidden", showCandidate);
  candidateTab.classList.toggle("active", showCandidate);
  recruiterTab.classList.toggle("active", !showCandidate);
  candidateTab.setAttribute("aria-selected", String(showCandidate));
  recruiterTab.setAttribute("aria-selected", String(!showCandidate));
}

candidateTab.addEventListener("click", () => showView("candidate"));
recruiterTab.addEventListener("click", () => showView("recruiter"));

refreshButton.addEventListener("click", () => {
  checks += 1;
  refreshCount.textContent = String(checks);
  statusTitle.textContent = "No new decision—your application is still active.";

  if (!supportOptIn.checked) {
    statusMessage.textContent = "Support personalization is off. Only confirmed application information is shown.";
  } else if (checks === 1) {
    statusMessage.textContent = "You checked once. Quiet processing does not signal a negative outcome.";
  } else if (checks < 4) {
    statusMessage.textContent = "You have checked again. Nothing is required from you; we will label actual changes clearly.";
  } else {
    statusMessage.textContent = "Repeated checking can happen when information is incomplete. This pattern is private and never used in hiring evaluation.";
  }
});

supportOptIn.addEventListener("change", () => {
  statusMessage.textContent = supportOptIn.checked
    ? "Support personalization is on. This preference stays separate from evaluation."
    : "Support personalization is off. Only confirmed application information is shown.";
});
