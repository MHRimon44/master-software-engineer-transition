import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { can, isRole, type Permission } from './lib/permissions';
import { SESSION_COOKIE } from './lib/session';
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const required: Permission = path.startsWith('/admin')
    ? 'admin:read'
    : path.startsWith('/projects/manage')
      ? 'projects:write'
      : 'dashboard:read';
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let role: unknown;
  try {
    const secret = process.env.AUTH_SECRET;
    if (!secret || secret.length < 32 || !token) throw new Error('No valid session');
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ['HS256'],
    });
    if (typeof payload.sub !== 'string') throw new Error('Invalid subject');
    role = payload.role;
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (!isRole(role) || !can(role, required))
    return NextResponse.redirect(new URL('/forbidden', request.url));
  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/projects/manage/:path*', '/admin/:path*'],
};
