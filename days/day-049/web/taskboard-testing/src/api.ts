export type Task = { id: string; title: string; done: boolean };
export async function loadTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks');
  if (!response.ok) throw new Error('Unable to load tasks');
  return (await response.json()) as Task[];
}
