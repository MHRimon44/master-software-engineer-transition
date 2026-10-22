import React from 'react';
('use client');
import { useState } from 'react';
export function TaskForm({ onCreate }: { onCreate: (title: string) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (title.trim().length < 3) {
          setError('At least 3 characters required');
          return;
        }
        setError('');
        setBusy(true);
        try {
          await onCreate(title.trim());
          setTitle('');
        } catch {
          setError('Unable to create task');
        } finally {
          setBusy(false);
        }
      }}
    >
      <label htmlFor="title">Task title</label>
      <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button disabled={busy} type="submit">
        {busy ? 'Saving...' : 'Add task'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
