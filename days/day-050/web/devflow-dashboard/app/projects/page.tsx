import type {Metadata} from 'next';
import ProjectFilter from '@/components/project-filter';
import {projects} from '@/lib/projects';
export const metadata:Metadata={title:'Projects',description:'Browse and filter DevFlow projects'};
export default function ProjectsPage(){return <><div className="page-heading"><span className="eyebrow">WORKSPACE</span><h1>All projects</h1><p>Search and filter projects. Select one to view its tasks.</p></div><ProjectFilter projects={projects}/></>}
