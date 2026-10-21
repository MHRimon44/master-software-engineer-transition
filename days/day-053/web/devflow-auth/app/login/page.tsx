import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/login-form';
export default async function LoginPage(){if(await getSession())redirect('/dashboard');return <section className="narrow"><p className="eyebrow">SECURE ACCESS</p><h1>Sign in</h1><p>Use the demo credentials configured in your local .env.local file.</p><LoginForm /></section>;}
