import { NextResponse } from 'next/server';
import { currentSession } from '@/lib/session';
import { can } from '@/lib/permissions';
export async function GET() {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  if (!can(session.role, 'admin:read'))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return NextResponse.json({
    report: 'Demo-only admin report',
    viewer: session.email,
  });
}
