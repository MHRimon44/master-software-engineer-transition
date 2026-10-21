import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'DevFlow Tasks | Day 52', description: 'Next.js Server Actions learning lab' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
