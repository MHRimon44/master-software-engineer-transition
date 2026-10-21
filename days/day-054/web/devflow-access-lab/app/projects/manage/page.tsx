import { approveProject } from '@/app/actions';
import { requirePermission } from '@/lib/authorize';
export default async function Manage({ searchParams }: { searchParams: Promise<{ approved?: string }> }) {
  await requirePermission('projects:write');
  const { approved } = await searchParams;
  return <section className="card"><p className="eyebrow">Manager or admin</p><h1>Manage projects</h1><p className="muted">Protected page and protected Server Action.</p>{approved === '1' && <p role="status">Demo approval submitted (not persisted).</p>}<form action={approveProject}><button type="submit">Approve sample project</button></form></section>;
}
