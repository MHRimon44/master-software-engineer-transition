import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import WebVitals from '@/components/WebVitals';
import { siteName, siteUrl } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: '%s | DevFlow' },
  description:
    'Explore Next.js Core Web Vitals, image optimization, code splitting, SEO and accessible UI.',
  alternates: { canonical: '/' },
  openGraph: {
    title: siteName,
    description: 'Learn measurable Next.js performance and production fundamentals.',
    url: '/',
    siteName,
    type: 'website',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <WebVitals />
        <header className="top">
          <strong>⚡ DevFlow Performance Lab</strong>
          <nav aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/images">Images</Link>
            <Link href="/interactive">Interactive</Link>
            <Link href="/feedback">Feedback</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </header>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer>Day 56 · Measure, optimize, verify</footer>
      </body>
    </html>
  );
}
