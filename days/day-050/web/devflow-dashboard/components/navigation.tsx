'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Navigation() {
 const path = usePathname();
 return <nav aria-label="Main navigation" className="nav">
  <Link className={path==='/'?'active':''} href="/">Overview</Link>
  <Link className={path.startsWith('/projects')?'active':''} href="/projects">Projects</Link>
 </nav>;
}
