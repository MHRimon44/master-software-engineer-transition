import Link from 'next/link';
export default function NotFound(){return <div className="hero"><span className="eyebrow">404 · NOT FOUND</span><h1>This page does not exist.</h1><p>Check the URL or return to the dashboard.</p><Link className="button" href="/">Go to overview →</Link></div>}
