import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { isRole, type Role } from './permissions';
export const SESSION_COOKIE = 'devflow_session';
export type Session = { userId: string; email: string; role: Role };
function key(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32)
    throw new Error('AUTH_SECRET must contain at least 32 characters');
  return new TextEncoder().encode(secret);
}
export async function signSession(session: Session): Promise<string> {
  return new SignJWT({ email: session.email, role: session.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key());
}
export async function verifySession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), {
      algorithms: ['HS256'],
    });
    if (
      typeof payload.sub !== 'string' ||
      typeof payload.email !== 'string' ||
      !isRole(payload.role)
    )
      return null;
    return { userId: payload.sub, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
export async function currentSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
