export type Project = {
  id: string;
  name: string;
  status: 'Active' | 'Planning';
  tasks: number;
};
export const projects: Project[] = [
  { id: 'commerce', name: 'Commerce Platform', status: 'Active', tasks: 12 },
  { id: 'transport', name: 'Transport Dashboard', status: 'Active', tasks: 8 },
  { id: 'assistant', name: 'AI Task Assistant', status: 'Planning', tasks: 5 },
];
