import type { Metadata } from 'next';
import FeedbackForm from '@/components/FeedbackForm';
export const metadata: Metadata = {
  title: 'Accessible feedback',
  description: 'Practice labeled fields, keyboard focus and accessible validation.',
  alternates: { canonical: '/feedback' },
};
export default function FeedbackPage() {
  return (
    <section>
      <span className="pill">Accessibility checkpoint</span>
      <h1>Send feedback</h1>
      <p className="muted">This is a local demo form. No data is sent or saved.</p>
      <FeedbackForm />
    </section>
  );
}
