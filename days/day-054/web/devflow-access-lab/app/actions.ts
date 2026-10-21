'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { SESSION_COOKIE, signSession } from '@/lib/session';
import { isRole } from '@/lib/permissions';
import { requirePermission } from '@/lib/authorize';
const credentials = z.object({ email: z.email(), password: z.string().min(1) });
export type LoginState = { error: string };
export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = credentials.safeParse({ email: formData.get('email'), password: formData.get('password') });
  if (!parsed.success) return { error: 'Enter a valid email and password.' };
  // Educational demo only: use a real identity provider and hashed passwords in production.
  if (parsed.data.email !== process.env.DEMO_EMAIL || parsed.data.password !== process.env.DEMO_PASSWORD) {
    return { error: 'Invalid credentials.' };
  }
  const role = isRole(process.env.DEMO_ROLE) ? process.env.DEMO_ROLE : 'member';
  const token = await signSession({ userId: 'demo-user', email: parsed.data.email, role });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax',
    path: '/', maxAge: 60 * 60,
  });
  redirect('/dashboard');
}
export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}
export async function approveProject(_formData: FormData) {
  const session = await requirePermission('projects:write');
  // Real mutation would validate resource ownership and write to database here.
  console.info('Demo approval by role:', session.role);
  redirect('/projects?approved=1');
}
