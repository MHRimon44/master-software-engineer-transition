'use strict';

const STORAGE_KEY = 'taskflow-day43-tasks';

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#task-title');
const priorityInput = document.querySelector('#task-priority');
const dateInput = document.querySelector('#task-date');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const taskCount = document.querySelector('#task-count');
const statusMessage = document.querySelector('#status-message');

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (task) =>
        task &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        typeof task.completed === 'boolean' &&
        ['low', 'medium', 'high'].includes(task.priority) &&
        typeof task.dueDate === 'string',
    );
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
}

let tasks = loadTasks();

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
    announce('Tasks could not be saved.');
  }
}

function announce(message) {
  statusMessage.textContent = '';

  requestAnimationFrame(() => {
    statusMessage.textContent = message;
  });
}

function formatDate(dateValue) {
  if (!dateValue) return '';

  const [year, month, day] = dateValue.split('-');

  return `${day}/${month}/${year}`;
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = 'task-item';

  if (task.completed) {
    item.classList.add('completed');
  }

  const content = document.createElement('div');
  content.className = 'task-content';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.id = `task-${task.id}`;

  const details = document.createElement('div');
  details.className = 'task-details';

  const title = document.createElement('label');
  title.className = 'task-title';
  title.htmlFor = checkbox.id;
  title.textContent = task.title;

  const meta = document.createElement('p');
  meta.className = 'task-meta';

  const priorityText = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  meta.textContent = task.dueDate
    ? `${priorityText} priority • Due ${formatDate(task.dueDate)}`
    : `${priorityText} priority`;

  details.append(title, meta);
  content.append(checkbox, details);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', `Delete task: ${task.title}`);

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;

    saveTasks();
    renderTasks();

    const updatedCheckbox = document.getElementById(`task-${task.id}`);

    updatedCheckbox?.focus();

    announce(task.completed ? `Completed: ${task.title}` : `Marked incomplete: ${task.title}`);
  });

  deleteButton.addEventListener('click', () => {
    const taskIndex = tasks.findIndex((item) => item.id === task.id);

    if (taskIndex === -1) return;

    tasks.splice(taskIndex, 1);

    saveTasks();
    renderTasks();

    const remainingDeleteButtons = taskList.querySelectorAll('.delete-button');

    const nextButton =
      remainingDeleteButtons[Math.min(taskIndex, remainingDeleteButtons.length - 1)];

    if (nextButton) {
      nextButton.focus();
    } else {
      titleInput.focus();
    }

    announce(`Deleted: ${task.title}`);
  });

  item.append(content, deleteButton);

  return item;
}

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  taskCount.textContent = `${total} task${total === 1 ? '' : 's'} • ` + `${completed} completed`;

  emptyState.hidden = total > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();

  if (title.length < 3 || title.length > 100) {
    titleInput.setCustomValidity('Enter a task title between 3 and 100 characters.');
    titleInput.reportValidity();
    return;
  }

  titleInput.setCustomValidity('');

  const task = {
    id: crypto.randomUUID(),
    title,
    priority: priorityInput.value,
    dueDate: dateInput.value,
    completed: false,
  };

  tasks.unshift(task);

  saveTasks();
  renderTasks();

  form.reset();
  titleInput.focus();

  announce(`Task added: ${task.title}`);
});

titleInput.addEventListener('input', () => {
  titleInput.setCustomValidity('');
});

renderTasks();
