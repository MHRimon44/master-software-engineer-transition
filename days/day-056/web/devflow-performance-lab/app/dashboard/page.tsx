import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Dashboard integration checkpoint',
  robots: { index: false, follow: false },
};
export default function DashboardPage() {
  return (
    <section>
      <span className="pill">Integration required</span>
      <h1>Protected dashboard checkpoint</h1>
      <p>
        This standalone lab does not implement authentication. Do not deploy this page with private
        data.
      </p>
      <p>
        Connect the Day 55 authorization boundary and NestJS session validation before enabling real
        dashboard data.
      </p>
      <Link href="/">Back to public landing page</Link>
    </section>
  );
}
