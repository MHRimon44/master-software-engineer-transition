import Link from 'next/link';
export default function Admin(){return <main><nav><Link href="/">Home</Link></nav><h1>Admin Testing Scenario</h1><p>This page is deliberately public in the demo. Do not treat it as a protected route. RBAC is exercised through tested server-side business functions.</p></main>}
