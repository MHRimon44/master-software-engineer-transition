import Link from 'next/link';
import { projects } from '@/lib/data';
export default function Home() {
 return <><p className="eyebrow">DAY 51 / NEXT.JS</p><h1>Data fetching & caching</h1><p>Compare cached and fresh server-side requests, then inspect a local Route Handler.</p><div className="grid"><Link className="card" href="/cached"><h2>Cached data →</h2><p>60-second revalidation</p></Link><Link className="card" href="/fresh"><h2>Fresh data →</h2><p>Request-time fetching</p></Link></div><h2>Static project dataset</h2><div className="grid">{projects.map(p=><div className="card" key={p.id}><strong>{p.name}</strong><p>{p.status} · {p.tasks} tasks</p></div>)}</div></>;
}
