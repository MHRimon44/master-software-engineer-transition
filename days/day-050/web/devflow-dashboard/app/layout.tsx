import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'DevFlow | Dashboard', template: '%s | DevFlow' },
  description: 'Day 50 Next.js App Router practice dashboard',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <Link href="/" className="brand">
              ◆ DevFlow <span>Day 50</span>
            </Link>
            <Navigation />
          </header>
          <main>{children}</main>
          <footer>Next.js App Router · Server + Client Components · Day 50</footer>
        </div>
      </body>
    </html>
  );
}
