import { describe, it, expect } from 'vitest';
import { can } from '../lib/rbac';
describe('RBAC', () => {
  it('member cannot manage or administer', () => {
    expect(can('member', 'view')).toBe(true);
    expect(can('member', 'manage')).toBe(false);
    expect(can('member', 'admin')).toBe(false);
  });
  it('manager can manage but not administer', () => {
    expect(can('manager', 'manage')).toBe(true);
    expect(can('manager', 'admin')).toBe(false);
  });
  it('admin can administer', () => expect(can('admin', 'admin')).toBe(true));
});
