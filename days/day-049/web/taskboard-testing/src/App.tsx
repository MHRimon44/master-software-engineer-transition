import { useEffect, useRef, useState, type FormEvent } from 'react';
import { loadTasks, type Task } from './api';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let active = true;
    loadTasks()
      .then((data) => {
        if (active) setTasks(data);
      })
      .catch(() => {
        if (active) setApiError('Could not load tasks');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Task title is required');
      return;
    }
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title: trimmed, done: false }]);
    setTitle('');
    setError('');
    inputRef.current?.focus();
  }
  return (
    <main className="shell">
      <header>
        <p className="eyebrow">DAY 49 · TESTING LAB</p>
        <h1>TaskBoard</h1>
        <p>Test what your users actually see and do.</p>
      </header>
      <section className="panel" aria-label="Task board">
        <form onSubmit={addTask} noValidate>
          <label htmlFor="task-title">New task</label>
          <div className="formrow">
            <input
              id="task-title"
              ref={inputRef}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="Write a task"
              aria-invalid={!!error}
              aria-describedby={error ? 'task-error' : undefined}
            />
            <button type="submit">Add task</button>
          </div>
          {error && (
            <p id="task-error" role="alert">
              {error}
            </p>
          )}
        </form>
        <h2>
          Tasks <span>({tasks.length})</span>
        </h2>
        {loading ? (
          <p role="status">Loading tasks…</p>
        ) : apiError ? (
          <p role="alert">{apiError}</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() =>
                      setTasks((prev) =>
                        prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
                      )
                    }
                  />
                  <span className={task.done ? 'done' : ''}>{task.title}</span>
                </label>
                <button
                  type="button"
                  aria-label={`Delete ${task.title}`}
                  onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer>Vitest · React Testing Library · MSW · Playwright</footer>
    </main>
  );
}
