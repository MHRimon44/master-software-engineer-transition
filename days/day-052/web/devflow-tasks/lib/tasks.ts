// Educational in-memory store only. It resets on restart and is NOT production-safe.
// In serverless/multi-instance deployments, writes may be lost or inconsistent.
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};
const initial: Task[] = [
  {
    id: 'demo-1',
    title: 'Learn Server Actions',
    completed: true,
    createdAt: 1,
  },
  {
    id: 'demo-2',
    title: 'Validate form inputs',
    completed: false,
    createdAt: 2,
  },
];
const globalStore = globalThis as typeof globalThis & { __day52Tasks?: Task[] };
const tasks = (globalStore.__day52Tasks ??= initial);
export async function listTasks(): Promise<Task[]> {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
}
export async function addTask(title: string) {
  tasks.push({
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  });
}
export async function toggleTask(id: string) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
}
export async function deleteTask(id: string) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) tasks.splice(index, 1);
}
