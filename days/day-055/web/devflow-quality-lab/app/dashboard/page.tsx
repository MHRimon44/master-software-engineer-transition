import Link from 'next/link';
export default function Dashboard() {
  return (
    <main>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <h1>Task Dashboard</h1>
      <p>Testing fixture: project tasks and workflows.</p>
      <ul>
        <li>Validate task titles</li>
        <li>Reject unauthorized mutations</li>
        <li>Test UI interactions</li>
      </ul>
    </main>
  );
}
