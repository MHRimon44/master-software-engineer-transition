import { cookies } from 'next/headers';
import type { Role } from './rbac';
// EDUCATIONAL ONLY: unsigned role cookies are NOT secure authentication.
// The demo never trusts this value for production-sensitive operations.
export async function getDemoRole(): Promise<Role | null> {
  const jar = await cookies();
  const role = jar.get('demo-role')?.value;
  return role === 'member' || role === 'manager' || role === 'admin' ? role : null;
}
