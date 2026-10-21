import 'server-only';
import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { redirect } from 'next/navigation';

export type Session = { email: string; role: 'admin' | 'member'; exp: number };
const COOKIE = 'devflow_session';
function secret(): string {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error('Set AUTH_SECRET (at least 32 characters) in .env.local');
  return value;
}
function sign(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}
function validSignature(value: string, signature: string): boolean {
  const expected = Buffer.from(sign(value));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export function encodeSession(session: Session): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}
export function decodeSession(token: string | undefined): Session | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2 || !validSignature(parts[0], parts[1])) return null;
  try {
    const parsed: unknown = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (!parsed || typeof parsed !== 'object') return null;
    const s = parsed as Record<string, unknown>;
    if (typeof s.email !== 'string' || !['admin','member'].includes(String(s.role)) || typeof s.exp !== 'number' || s.exp <= Date.now()) return null;
    return {email:s.email, role:s.role as Session['role'], exp:s.exp};
  } catch { return null; }
}
export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  return decodeSession(jar.get(COOKIE)?.value);
}
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}
export async function setSession(email: string, role: Session['role']): Promise<void> {
  const jar = await cookies();
  const maxAge = 60 * 60;
  jar.set(COOKIE, encodeSession({email,role,exp:Date.now()+maxAge*1000}), {
    httpOnly:true, secure:process.env.NODE_ENV==='production', sameSite:'lax', path:'/', maxAge
  });
}
export async function clearSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
