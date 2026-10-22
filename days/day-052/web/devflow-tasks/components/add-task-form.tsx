'use client';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createTask, type FormState } from '@/app/actions';
const initialState: FormState = { error: '', success: false };
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Adding…' : 'Add task'}
    </button>
  );
}
export default function AddTaskForm() {
  const [state, action] = useActionState(createTask, initialState);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) ref.current?.reset();
  }, [state]);
  return (
    <form action={action} ref={ref} className="add-form">
      <label htmlFor="task-title">New task</label>
      <div className="form-row">
        <input
          id="task-title"
          name="title"
          placeholder="What needs to be done?"
          required
          minLength={3}
          maxLength={100}
          aria-describedby={state.error ? 'form-error' : undefined}
        />
        <SubmitButton />
      </div>
      {state.error && (
        <p role="alert" id="form-error">
          {state.error}
        </p>
      )}
    </form>
  );
}
