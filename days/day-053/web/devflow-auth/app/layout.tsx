import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {
  title: 'DevFlow Auth Lab',
  description: 'Day 53 Next.js authentication lab',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <Link href="/">◆ DevFlow Auth</Link>
          <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/login">Login</Link>
          </nav>
        </header>
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
