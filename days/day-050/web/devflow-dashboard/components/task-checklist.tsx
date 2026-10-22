'use client';
import { useState } from 'react';
import type { Task } from '@/lib/projects';
export default function TaskChecklist({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const completed = tasks.filter((t) => t.done).length;
  return (
    <section className="card">
      <div className="between">
        <h2>Tasks</h2>
        <span className="pill">
          {completed}/{tasks.length} done
        </span>
      </div>
      <p className="muted">Interactive demo: changes stay in this page session only.</p>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                }
              />
              <span className={t.done ? 'done' : ''}>{t.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
