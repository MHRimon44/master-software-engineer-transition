import { requirePermission } from '@/lib/authorize';
import { logout } from '@/app/actions';
export default async function Dashboard() {
  const session = await requirePermission('dashboard:read');
  return (
    <section className="card">
      <p className="eyebrow">Protected dashboard</p>
      <h1>Welcome back</h1>
      <p>
        Signed in as <strong>{session.email}</strong>
      </p>
      <p>
        Role: <span className="tag">{session.role}</span>
      </p>
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </section>
  );
}
