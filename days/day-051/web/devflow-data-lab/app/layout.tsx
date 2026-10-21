import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = { title: 'Day 51 | DevFlow Data Lab', description: 'Learn Next.js server data fetching and caching' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="header"><Link href="/">DevFlow Data Lab</Link><nav><Link href="/cached">Cached</Link><Link href="/fresh">Fresh</Link><Link href="/api/projects">API JSON</Link></nav></header><main className="container">{children}</main></body></html>;
}
