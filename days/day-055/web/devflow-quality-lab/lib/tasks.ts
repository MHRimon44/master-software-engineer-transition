import { z } from 'zod';
import { can, type Role } from './rbac';
export const taskSchema = z.string().trim().min(3).max(80);
export type Task = { id: number; title: string };
export type Store = { tasks: Task[]; nextId: number };
export function createTask(store: Store, role: Role | null, input: unknown): Task {
  if (!role) throw new Error('UNAUTHENTICATED');
  if (!can(role, 'manage')) throw new Error('FORBIDDEN');
  const title = taskSchema.parse(input);
  const task = { id: store.nextId++, title };
  store.tasks.push(task);
  return task;
}
