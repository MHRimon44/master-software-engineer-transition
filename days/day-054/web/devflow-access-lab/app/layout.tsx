import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {
  title: 'DevFlow Access Lab',
  description: 'Day 54 Next.js RBAC security learning lab',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="top">
          <Link href="/">
            DevFlow <strong>Access Lab</strong>
          </Link>
          <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/projects/manage">Manage</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>Day 54 · Middleware · RBAC · Security testing</footer>
      </body>
    </html>
  );
}
