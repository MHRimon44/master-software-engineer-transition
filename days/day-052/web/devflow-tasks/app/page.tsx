import AddTaskForm from '@/components/add-task-form';
import { changeTask, removeTask } from './actions';
import { listTasks } from '@/lib/tasks';
export const dynamic = 'force-dynamic';
export default async function HomePage() {
  const tasks = await listTasks();
  const complete = tasks.filter(task=>task.completed).length;
  return <main className="shell">
    <header><span className="eyebrow">DAY 52 · NEXT.JS LAB</span><h1>DevFlow Tasks</h1><p>Server Actions, validation, and revalidation.</p></header>
    <section className="stats"><div><strong>{tasks.length}</strong><span>Total tasks</span></div><div><strong>{complete}</strong><span>Completed</span></div><div><strong>{tasks.length-complete}</strong><span>Pending</span></div></section>
    <section className="panel"><h2>Create task</h2><AddTaskForm /></section>
    <section className="panel"><h2>Task board</h2>{tasks.length === 0 ? <p>No tasks yet. Add one above.</p> : <ul className="task-list">{tasks.map(task=><li key={task.id}>
      <form action={changeTask}><input type="hidden" name="id" value={task.id}/><button className="toggle" type="submit" aria-label={`Toggle ${task.title}`}>{task.completed ? '✓' : '○'}</button></form>
      <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      <form action={removeTask}><input type="hidden" name="id" value={task.id}/><button className="delete" type="submit" aria-label={`Delete ${task.title}`}>Delete</button></form>
    </li>)}</ul>}</section>
    <footer>Educational demo · In-memory data resets on server restart</footer>
  </main>;
}
