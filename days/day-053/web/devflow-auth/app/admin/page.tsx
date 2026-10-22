import { requireSession } from '@/lib/auth';
import Link from 'next/link';
export default async function AdminPage() {
  const session = await requireSession();
  if (session.role !== 'admin')
    return (
      <section className="panel">
        <h1>403 — Forbidden</h1>
        <p>You are signed in but do not have admin access.</p>
        <Link href="/dashboard">Back to dashboard</Link>
      </section>
    );
  return (
    <section>
      <p className="eyebrow">ROLE-BASED ACCESS</p>
      <h1>Admin area</h1>
      <div className="panel">
        <p>Admin-only content. Access was checked on the server.</p>
        <p>Current user: {session.email}</p>
      </div>
    </section>
  );
}
