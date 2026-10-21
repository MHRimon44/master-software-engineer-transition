import Link from 'next/link';
import {projects,completion} from '@/lib/projects';
export default function Home() {
 const total=projects.reduce((sum,p)=>sum+p.tasks.length,0);
 const done=projects.reduce((sum,p)=>sum+p.tasks.filter(t=>t.done).length,0);
 return <><div className="hero"><span className="eyebrow">PROJECT OVERVIEW</span><h1>Build better, one project at a time.</h1><p>Explore file-based routing, shared layouts, and interactive client components.</p><Link className="button" href="/projects">Explore projects →</Link></div>
 <div className="stats"><div className="stat"><span>Projects</span><strong>{projects.length}</strong></div><div className="stat"><span>Total tasks</span><strong>{total}</strong></div><div className="stat"><span>Completed</span><strong>{done}</strong></div></div>
 <div className="section-head"><h2>Featured projects</h2><Link href="/projects">View all →</Link></div>
 <div className="cards">{projects.slice(0,3).map(p=><Link href={`/projects/${p.id}`} className="card card-link" key={p.id}><span className="pill">{p.category}</span><h2>{p.name}</h2><p>{p.description}</p><div className="track"><div style={{width:`${completion(p)}%`}}/></div><span className="muted">{completion(p)}% complete</span></Link>)}</div></>;
}
