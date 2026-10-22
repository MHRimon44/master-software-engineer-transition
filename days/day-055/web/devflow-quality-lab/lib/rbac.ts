export type Role = 'member' | 'manager' | 'admin';
export type Action = 'view' | 'manage' | 'admin';
const grants: Record<Role, Action[]> = {
  member: ['view'],
  manager: ['view', 'manage'],
  admin: ['view', 'manage', 'admin'],
};
export function can(role: Role, action: Action): boolean {
  return grants[role].includes(action);
}
