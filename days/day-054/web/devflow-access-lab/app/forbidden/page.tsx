import Link from 'next/link';
export default function Forbidden() { return <section className="card"><p className="eyebrow">403 · Access denied</p><h1>Insufficient permissions</h1><p>Your session does not allow this operation.</p><Link href="/dashboard">Back to dashboard</Link></section>; }
