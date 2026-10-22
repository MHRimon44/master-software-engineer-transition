'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, type LoginState } from '@/app/actions/auth';
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}
export default function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(login, {
    error: '',
  });
  return (
    <form action={action} className="panel form">
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && (
        <p role="alert" className="error">
          {state.error}
        </p>
      )}
      <Submit />
    </form>
  );
}
