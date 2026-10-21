"use strict";

/* =====================================
   STORAGE KEYS
===================================== */

const TASK_STORAGE_KEY = "day44-taskflow-tasks";
const THEME_STORAGE_KEY = "day44-taskflow-theme";

/* =====================================
   DOM REFERENCES
===================================== */

const taskForm = document.querySelector("#task-form");
const taskTitleInput = document.querySelector("#task-title");
const taskPriorityInput = document.querySelector("#task-priority");

const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

const totalCount = document.querySelector("#total-count");
const completedCount = document.querySelector("#completed-count");
const pendingCount = document.querySelector("#pending-count");

const taskCountLabel = document.querySelector("#task-count-label");

const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");
const progressLabel = document.querySelector("#progress-label");

const themeToggle = document.querySelector("#theme-toggle");
const announcement = document.querySelector("#announcement");

/* =====================================
   STATE
===================================== */

let tasks = loadTasks();

/* =====================================
   LOCAL STORAGE
===================================== */

function loadTasks() {
  try {
    const stored = localStorage.getItem(TASK_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((task) => {
      return (
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.priority === "string" &&
        typeof task.completed === "boolean"
      );
    });
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
    announce("Unable to save tasks to browser storage.");
  }
}

/* =====================================
   ACCESSIBILITY ANNOUNCEMENTS
===================================== */

function announce(message) {
  announcement.textContent = "";

  requestAnimationFrame(() => {
    announcement.textContent = message;
  });
}

/* =====================================
   CREATE TASK
===================================== */

function createTask(title, priority) {
  const task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);

  saveTasks();
  render();

  announce(`Task added: ${task.title}`);

  return task;
}

/* =====================================
   COMPLETE TASK
===================================== */

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  task.completed = !task.completed;

  saveTasks();
  render();

  announce(
    task.completed
      ? `Task completed: ${task.title}`
      : `Task marked pending: ${task.title}`,
  );
}

/* =====================================
   DELETE TASK
===================================== */

function deleteTask(id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  tasks = tasks.filter((item) => item.id !== id);

  saveTasks();
  render();

  announce(`Task deleted: ${task.title}`);
}

/* =====================================
   CREATE TASK ELEMENT
===================================== */

function createTaskElement(task) {
  const li = document.createElement("li");

  li.className = "task-item";

  if (task.completed) {
    li.classList.add("completed");
  }

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;

  checkbox.setAttribute("aria-label", `Mark ${task.title} as completed`);

  checkbox.addEventListener("change", () => {
    toggleTask(task.id);
  });

  const info = document.createElement("div");
  info.className = "task-info";

  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;

  const priority = document.createElement("span");

  priority.className = `priority-badge priority-${task.priority}`;

  priority.textContent = `${task.priority.toUpperCase()} PRIORITY`;

  info.append(title, priority);

  const deleteButton = document.createElement("button");

  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  deleteButton.setAttribute("aria-label", `Delete task ${task.title}`);

  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  });

  li.append(checkbox, info, deleteButton);

  return li;
}

/* =====================================
   RENDER TASK LIST
===================================== */

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });

  emptyState.hidden = tasks.length > 0;

  taskCountLabel.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
}

/* =====================================
   UPDATE STATISTICS
===================================== */

function renderStats() {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalCount.textContent = String(total);
  completedCount.textContent = String(completed);
  pendingCount.textContent = String(pending);

  progressFill.style.width = `${progress}%`;

  progressLabel.textContent = `${progress}% completed`;

  progressTrack.setAttribute("aria-valuenow", String(progress));
}

/* =====================================
   RENDER APPLICATION
===================================== */

function render() {
  renderTasks();
  renderStats();
}

/* =====================================
   FORM SUBMISSION
===================================== */

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!taskForm.reportValidity()) {
    return;
  }

  const title = taskTitleInput.value.trim();
  const priority = taskPriorityInput.value;

  if (title.length < 3) {
    taskTitleInput.setCustomValidity(
      "Task title must contain at least 3 characters.",
    );

    taskTitleInput.reportValidity();
    return;
  }

  taskTitleInput.setCustomValidity("");

  createTask(title, priority);

  taskForm.reset();

  taskTitleInput.focus();
});

taskTitleInput.addEventListener("input", () => {
  taskTitleInput.setCustomValidity("");
});

/* =====================================
   THEME MANAGEMENT
===================================== */

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-theme", isDark);

  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function loadTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-theme");

  const nextTheme = isDark ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (error) {
    console.error("Failed to save theme:", error);
  }

  announce(`${nextTheme} mode enabled`);
});

/* =====================================
   INITIALIZE
===================================== */

applyTheme(loadTheme());
render();
