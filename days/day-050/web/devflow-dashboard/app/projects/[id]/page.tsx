import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import TaskChecklist from '@/components/task-checklist';
import {completion,getProject,projects} from '@/lib/projects';
export function generateStaticParams(){return projects.map(p=>({id:p.id}));}
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
 const {id}=await params;const project=getProject(id);
 return {title:project?.name??'Project not found',description:project?.description};
}
export default async function ProjectDetails({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const project=getProject(id);
 if(!project)notFound();
 return <><Link className="back" href="/projects">← Back to projects</Link><div className="page-heading"><span className="eyebrow">{project.category.toUpperCase()} PROJECT</span><h1>{project.name}</h1><p>{project.description}</p></div><div className="card progress-card"><div className="between"><strong>Initial progress</strong><span>{completion(project)}%</span></div><div className="track"><div style={{width:`${completion(project)}%`}} /></div></div><TaskChecklist initialTasks={project.tasks}/></>;
}
