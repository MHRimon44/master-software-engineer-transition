import { LoginForm } from './login-form';
export default function LoginPage() {
  return (
    <section className="card">
      <p className="eyebrow">DevFlow / Login</p>
      <h1>Sign in</h1>
      <p className="muted">Use the credentials configured in your local .env.local file.</p>
      <LoginForm />
    </section>
  );
}
