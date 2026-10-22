import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { taskReducer } from './taskReducer';
import type { Task } from './taskReducer';
import { usePersistentReducer } from './usePersistentReducer';
function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" className="secondary" onClick={toggleTheme}>
      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}
function TaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = title.trim();
    if (value.length < 3) return;
    onAdd(value);
    setTitle('');
    inputRef.current?.focus();
  }
  return (
    <form onSubmit={submit} className="task-form">
      <label htmlFor="task-title">New task</label>
      <div className="form-row">
        <input
          ref={inputRef}
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={3}
          maxLength={90}
          required
          placeholder="Write a task (min 3 characters)"
        />
        <button type="submit">Add task</button>
      </div>
    </form>
  );
}
function TaskList({
  tasks,
  onToggle,
  onRemove,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  if (tasks.length === 0) return <p className="empty">No matching tasks.</p>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-row">
          <label className="task-label">
            <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
            <span className={task.done ? 'completed' : ''}>{task.title}</span>
          </label>
          <button
            type="button"
            className="danger"
            onClick={() => onRemove(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
function Board() {
  const [tasks, dispatch] = usePersistentReducer('day47-tasks', taskReducer, [] as Task[]);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  // Derived values: calculate during render, NOT in useEffect.
  const completed = tasks.filter((task) => task.done).length;
  const visible = tasks.filter(
    (task) => filter === 'all' || (filter === 'done' ? task.done : !task.done),
  );
  return (
    <main className="container">
      <header className="header">
        <div>
          <p className="eyebrow">Day 47 · React refresh</p>
          <h1>Task Board</h1>
        </div>
        <ThemeButton />
      </header>
      <section className="card" aria-label="Task summary">
        <div className="stats">
          <div>
            <strong>{tasks.length}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{completed}</strong>
            <span>Completed</span>
          </div>
          <div>
            <strong>{tasks.length - completed}</strong>
            <span>Active</span>
          </div>
        </div>
      </section>
      <section className="card" aria-label="Manage tasks">
        <TaskForm
          onAdd={(title) =>
            dispatch({
              type: 'add',
              task: { id: crypto.randomUUID(), title, done: false },
            })
          }
        />
        <div className="toolbar">
          <div className="filters" aria-label="Filter tasks">
            {(['all', 'active', 'done'] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={filter === value ? 'selected' : 'secondary'}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="secondary"
            onClick={() => dispatch({ type: 'clearCompleted' })}
            disabled={completed === 0}
          >
            Clear completed
          </button>
        </div>
        <TaskList
          tasks={visible}
          onToggle={(id) => dispatch({ type: 'toggle', id })}
          onRemove={(id) => dispatch({ type: 'remove', id })}
        />
      </section>
      <footer>
        State: reducer · Shared theme: context · Persistence: custom hook + effect · Focus: ref
      </footer>
    </main>
  );
}
export function App() {
  return (
    <ThemeProvider>
      <Board />
    </ThemeProvider>
  );
}
