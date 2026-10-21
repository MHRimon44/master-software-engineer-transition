import { lazy, memo, Suspense, useCallback, useMemo, useState, type ChangeEvent } from 'react';

type Task = { id: number; title: string; done: boolean };
const initialTasks: Task[] = Array.from({ length: 250 }, (_, i) => ({ id: i + 1, title: `Task ${i + 1}: review component behavior`, done: i % 7 === 0 }));
const Insights = lazy(() => import('./Insights'));

// Intentionally expensive work for profiling; not a production benchmark.
function computeScore(task: Task): number {
  let score = task.id;
  for (let i = 0; i < 3500; i++) score = (score * 17 + i) % 100003;
  return score;
}

type RowProps = { task: Task; onToggle: (id: number) => void };
function TaskRow({ task, onToggle }: RowProps) {
  const score = computeScore(task);
  return <li className="task"><label><input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} /><span className={task.done ? 'done' : ''}>{task.title}</span></label><small>Score: {score}</small></li>;
}
const MemoTaskRow = memo(TaskRow);

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [query, setQuery] = useState('');
  const [optimized, setOptimized] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const [sortByScore, setSortByScore] = useState(false);

  // In baseline mode a new function is passed to each row every render.
  const stableToggle = useCallback((id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }, []);
  const unstableToggle = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Derived data: no useEffect needed. useMemo here avoids repeating filtering/sorting on unrelated updates.
  const visibleTasks = useMemo(() => {
    const matched = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
    return sortByScore ? [...matched].sort((a, b) => computeScore(b) - computeScore(a)) : matched;
  }, [tasks, query, sortByScore]);
  const visible = visibleTasks.slice(0, 30);
  const doneCount = tasks.filter(t => t.done).length;
  const Row = optimized ? MemoTaskRow : TaskRow;

  return <main className="shell">
    <header><div><p className="eyebrow">Day 48 · React performance</p><h1>RenderLab</h1><p>Compare baseline and optimized rendering with React DevTools Profiler.</p></div><span className="tag">{optimized ? 'Optimized' : 'Baseline'}</span></header>
    <section className="metrics" aria-label="Statistics"><div className="panel"><strong>{tasks.length}</strong><span>Total tasks</span></div><div className="panel"><strong>{doneCount}</strong><span>Completed</span></div><div className="panel"><strong>{visible.length}</strong><span>Rendered rows (max 30)</span></div></section>
    <section className="panel controls"><label className="switch"><input type="checkbox" checked={optimized} onChange={(e: ChangeEvent<HTMLInputElement>) => setOptimized(e.target.checked)}/> Enable memoized rows</label><label>Filter tasks<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title" /></label><label className="switch"><input type="checkbox" checked={sortByScore} onChange={e => setSortByScore(e.target.checked)}/> Sort by score</label><button onClick={() => setCounter(c => c + 1)}>Unrelated counter: {counter}</button><button onClick={() => setShowInsights(v => !v)}>{showInsights ? 'Hide' : 'Open'} lazy insights</button></section>
    <p className="hint">Profiling exercise: record a counter click in baseline mode, then repeat in optimized mode. Compare row renders. React StrictMode may double-invoke renders in development.</p>
    {showInsights && <Suspense fallback={<p>Loading insights…</p>}><Insights /></Suspense>}
    <section className="panel"><h2>Task list</h2><p className="hint">Showing first 30 of {visibleTasks.length} matching tasks.</p><ul className="tasks">{visible.map(task => <Row key={task.id} task={task} onToggle={optimized ? stableToggle : unstableToggle} />)}</ul></section>
  </main>;
}
