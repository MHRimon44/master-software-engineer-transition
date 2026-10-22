import { requirePermission } from '@/lib/authorize';
export default async function Admin() {
  await requirePermission('admin:read');
  return (
    <section className="card">
      <p className="eyebrow">Admin only</p>
      <h1>Administration</h1>
      <p>Only users with the admin:read permission can view this page.</p>
    </section>
  );
}
