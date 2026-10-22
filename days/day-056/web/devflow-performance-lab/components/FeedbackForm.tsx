'use client';
import { useState, type FormEvent } from 'react';
export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.trim().length < 10) {
      setError('Please enter at least 10 characters.');
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
  }
  return (
    <form onSubmit={submit} noValidate className="card form-card">
      <label htmlFor="feedback-message">
        Your feedback <span aria-hidden="true">*</span>
      </label>
      <p id="feedback-hint" className="muted">
        Minimum 10 characters.
      </p>
      <textarea
        id="feedback-message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setError('');
          setSubmitted(false);
        }}
        aria-describedby={'feedback-hint' + (error ? ' feedback-error' : '')}
        aria-invalid={Boolean(error)}
        rows={5}
        required
      />
      {error && (
        <p id="feedback-error" role="alert" className="error">
          {error}
        </p>
      )}
      <button type="submit">Validate feedback</button>
      {submitted && (
        <p role="status">Feedback validated locally. Nothing was submitted to a server.</p>
      )}
    </form>
  );
}
