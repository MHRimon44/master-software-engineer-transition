import { requireSession } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';
export default async function Dashboard() {
  const session = await requireSession();
  return (
    <section>
      <p className="eyebrow">PROTECTED ROUTE</p>
      <h1>Welcome to DevFlow</h1>
      <div className="panel">
        <p>
          <strong>Signed in as:</strong> {session.email}
        </p>
        <p>
          <strong>Role:</strong> {session.role}
        </p>
        <p>
          <strong>Session expires:</strong> {new Date(session.exp).toLocaleString('en-US')}
        </p>
        <div className="actions">
          <Link className="button secondary" href="/admin">
            Admin area
          </Link>
          <form action={logout}>
            <button type="submit">Log out</button>
          </form>
        </div>
      </div>
    </section>
  );
}
