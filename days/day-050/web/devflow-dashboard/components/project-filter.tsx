'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { completion, type Project } from '@/lib/projects';
export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [projects, search, category],
  );
  return (
    <>
      <div className="filters">
        <label>
          Search projects
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description"
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="muted" role="status">
        Showing {filtered.length} of {projects.length} projects
      </p>
      <div className="cards">
        {filtered.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="card card-link">
            <div className="between">
              <span className="pill">{p.category}</span>
              <span className="muted">{completion(p)}%</span>
            </div>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <div className="track">
              <div style={{ width: `${completion(p)}%` }} />
            </div>
            <span className="view">View project →</span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty">No projects match your filters.</p>}
    </>
  );
}
