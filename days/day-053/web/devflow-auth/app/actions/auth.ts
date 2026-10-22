'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { clearSession, setSession } from '@/lib/auth';
import { timingSafeEqual } from 'node:crypto';

export type LoginState = { error: string };
const schema = z.object({ email: z.email(), password: z.string().min(1) });
function equal(a: string, b: string): boolean {
  const aa = Buffer.from(a),
    bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const input = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!input.success) return { error: 'Enter a valid email and password.' };
  const expectedEmail = process.env.DEMO_EMAIL;
  const expectedPassword = process.env.DEMO_PASSWORD;
  if (!expectedEmail || !expectedPassword) return { error: 'Demo credentials are not configured.' };
  if (!equal(input.data.email, expectedEmail) || !equal(input.data.password, expectedPassword))
    return { error: 'Invalid credentials.' };
  await setSession(input.data.email, process.env.DEMO_ROLE === 'admin' ? 'admin' : 'member');
  redirect('/dashboard');
}
export async function logout(): Promise<void> {
  await clearSession();
  redirect('/login');
}
