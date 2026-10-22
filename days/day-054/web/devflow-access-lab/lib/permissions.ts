export const roles = ['member', 'manager', 'admin'] as const;
export type Role = (typeof roles)[number];
export type Permission = 'dashboard:read' | 'projects:write' | 'admin:read';
const grants: Record<Role, readonly Permission[]> = {
  member: ['dashboard:read'],
  manager: ['dashboard:read', 'projects:write'],
  admin: ['dashboard:read', 'projects:write', 'admin:read'],
};
export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && roles.some((role) => role === value);
}
export function can(role: Role, permission: Permission): boolean {
  return grants[role].includes(permission);
}
