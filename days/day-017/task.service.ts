import type { CreateTaskInput, Task, UpdateTaskInput } from "./task.types.js";

const tasks: Task[] = [];

export function getTasks(): Task[] {
  return tasks;
}

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: Date.now().toString(),
    title: input.title,
    completed: false,
  };
  tasks.push(task);
  return task;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function updateTask(
  id: string,
  input: UpdateTaskInput,
): Task | undefined {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return undefined;
  }

  if (input.title !== undefined) {
    task.title = input.title;
  }
  if (input.completed !== undefined) {
    task.completed = input.completed;
  }

  return task;
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
}
