"use strict";
const KEY = "day45-grid-projects";
const THEME_KEY = "day45-grid-theme";
const $ = (selector) => document.querySelector(selector);
const form = $("#project-form");
const grid = $("#project-grid");
const live = $("#live");
const allowedStatuses = new Set(["active", "completed"]);
function loadProjects() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(value)
      ? value.filter(
          (p) =>
            p &&
            typeof p.id === "string" &&
            typeof p.name === "string" &&
            typeof p.owner === "string" &&
            allowedStatuses.has(p.status),
        )
      : [];
  } catch {
    return [];
  }
}
let projects = loadProjects();
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(projects));
  } catch {
    live.textContent = "Storage unavailable: changes may not persist.";
  }
}
function say(message) {
  live.textContent = "";
  requestAnimationFrame(() => {
    live.textContent = message;
  });
}
function makeButton(text, className, action, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `btn btn-small ${className}`;
  button.textContent = text;
  button.setAttribute("aria-label", label);
  button.addEventListener("click", action);
  return button;
}
function render() {
  const completed = projects.filter((p) => p.status === "completed").length;
  $("#total").textContent = String(projects.length);
  $("#active").textContent = String(projects.length - completed);
  $("#completed").textContent = String(completed);
  $("#percent").textContent = projects.length
    ? `${Math.round((completed / projects.length) * 100)}%`
    : "0%";
  $("#project-count").textContent =
    `${projects.length} ${projects.length === 1 ? "project" : "projects"}`;
  $("#empty").hidden = projects.length > 0;
  const cards = projects.map((project) => {
    const article = document.createElement("article");
    article.className = "project-card";
    const title = document.createElement("h3");
    title.textContent = project.name;
    const owner = document.createElement("p");
    owner.textContent = `Owner: ${project.owner}`;
    const actions = document.createElement("div");
    actions.className = "project-actions";
    const status = document.createElement("span");
    status.className = "pill";
    status.textContent =
      project.status === "completed" ? "Completed" : "Active";
    const toggle = makeButton(
      project.status === "completed" ? "Reopen" : "Complete",
      "btn-secondary",
      () => {
        project.status =
          project.status === "completed" ? "active" : "completed";
        save();
        render();
        say(`${project.name} status updated`);
      },
      `Toggle status for ${project.name}`,
    );
    const remove = makeButton(
      "Delete",
      "btn-danger",
      () => {
        projects = projects.filter((p) => p.id !== project.id);
        save();
        render();
        say(`${project.name} deleted`);
      },
      `Delete ${project.name}`,
    );
    actions.append(status, toggle, remove);
    article.append(title, owner, actions);
    return article;
  });
  grid.replaceChildren(...cards);
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = $("#name").value.trim(),
    owner = $("#owner").value.trim(),
    status = $("#status").value;
  if (name.length < 3) {
    $("#name").setCustomValidity("Enter at least three non-space characters.");
    $("#name").reportValidity();
    return;
  }
  if (!owner) {
    $("#owner").setCustomValidity("Owner is required.");
    $("#owner").reportValidity();
    return;
  }
  if (!allowedStatuses.has(status)) return;
  projects.unshift({ id: crypto.randomUUID(), name, owner, status });
  save();
  render();
  form.reset();
  $("#name").focus();
  say(`${name} created`);
});
for (const id of ["#name", "#owner"])
  $(id).addEventListener("input", (e) => e.target.setCustomValidity(""));
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  $("#theme-button").textContent = dark ? "Light mode" : "Dark mode";
  $("#theme-button").setAttribute("aria-pressed", String(dark));
}
let dark = false;
try {
  dark = localStorage.getItem(THEME_KEY) === "dark";
} catch {}
setTheme(dark);
$("#theme-button").addEventListener("click", () => {
  dark = !dark;
  setTheme(dark);
  try {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch {}
  say(dark ? "Dark mode enabled" : "Light mode enabled");
});
render();
