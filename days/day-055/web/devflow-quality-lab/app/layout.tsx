import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = { title: 'DevFlow Quality Lab', description: 'Day 55 Next.js testing lab' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
