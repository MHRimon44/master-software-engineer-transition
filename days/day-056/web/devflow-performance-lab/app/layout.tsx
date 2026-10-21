import type { Metadata } from 'next';
import './globals.css';
import WebVitals from '@/components/WebVitals';
export const metadata: Metadata = {title:'DevFlow Performance Lab',description:'Next.js performance optimization workshop'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang='en'><body><WebVitals/><header className='top'><strong>⚡ DevFlow Performance Lab</strong><nav><a href='/'>Dashboard</a><a href='/images'>Images</a><a href='/interactive'>Interactive</a></nav></header><main>{children}</main><footer>Day 56 · Measure before optimizing</footer></body></html>}
