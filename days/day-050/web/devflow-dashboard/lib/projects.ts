export type Task = { id: string; title: string; done: boolean };
export type Project = { id: string; name: string; description: string; category: string; tasks: Task[] };

export const projects: Project[] = [
  { id: 'commerce', name: 'E-commerce Platform', description: 'Modern storefront and order management.', category: 'Web', tasks: [
    {id:'c1',title:'Build product catalog',done:true},{id:'c2',title:'Create cart flow',done:true},{id:'c3',title:'Checkout validation',done:false},{id:'c4',title:'Accessibility review',done:false}] },
  { id: 'transport', name: 'Transport Dashboard', description: 'Manage trips and operational reports.', category: 'Operations', tasks: [
    {id:'t1',title:'Create dashboard shell',done:true},{id:'t2',title:'Add trip filters',done:false},{id:'t3',title:'Connect reporting',done:false}] },
  { id: 'assistant', name: 'AI Task Assistant', description: 'Explore useful AI-assisted workflows.', category: 'AI', tasks: [
    {id:'a1',title:'Design task schema',done:true},{id:'a2',title:'Prototype interface',done:false},{id:'a3',title:'Evaluate responses',done:false}] },
  { id: 'portfolio', name: 'Developer Portfolio', description: 'Personal work and case studies.', category: 'Personal', tasks: [
    {id:'p1',title:'Write about section',done:true},{id:'p2',title:'Add projects',done:true},{id:'p3',title:'Polish mobile layout',done:false}] },
];
export const getProject = (id: string) => projects.find(p=>p.id===id);
export const completion = (project: Project) => Math.round(100 * project.tasks.filter(t=>t.done).length / project.tasks.length);
