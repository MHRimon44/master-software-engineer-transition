'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, type LoginState } from '@/app/actions';
function Submit() { const { pending } = useFormStatus(); return <button type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>; }
export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(login, { error: '' });
  return <form action={action}><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="username" required/><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required/>{state.error && <p role="alert" className="alert">{state.error}</p>}<Submit /></form>;
}
