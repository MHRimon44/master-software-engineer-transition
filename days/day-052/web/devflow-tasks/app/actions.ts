'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addTask, toggleTask, deleteTask } from '@/lib/tasks';
export type FormState = { error: string; success: boolean };
const titleSchema = z.string().trim().min(3, 'Use at least 3 characters').max(100, 'Maximum 100 characters');
const idSchema = z.string().uuid().or(z.enum(['demo-1','demo-2']));
export async function createTask(_previous: FormState, formData: FormData): Promise<FormState> {
  const parsed = titleSchema.safeParse(formData.get('title'));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid title', success: false };
  await addTask(parsed.data);
  revalidatePath('/');
  return { error: '', success: true };
}
export async function changeTask(formData: FormData): Promise<void> {
  const id = idSchema.safeParse(formData.get('id'));
  if (!id.success) return;
  await toggleTask(id.data);
  revalidatePath('/');
}
export async function removeTask(formData: FormData): Promise<void> {
  const id = idSchema.safeParse(formData.get('id'));
  if (!id.success) return;
  await deleteTask(id.data);
  revalidatePath('/');
}
// For authenticated applications, verify the session and resource ownership
// inside EACH action before performing mutations.
