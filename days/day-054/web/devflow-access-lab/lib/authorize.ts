import { redirect } from 'next/navigation';
import { currentSession } from './session';
import { can, type Permission } from './permissions';
export async function requirePermission(permission: Permission) {
  const session = await currentSession();
  if (!session) redirect('/login');
  if (!can(session.role, permission)) redirect('/forbidden');
  return session;
}
