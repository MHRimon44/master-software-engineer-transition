'use client';
import { useEffect } from 'react';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      '[Route error]',
      error,
    ); /* Replace with approved server-side monitoring pipeline; never send secrets/PII. */
  }, [error]);
  return (
    <section role="alert">
      <h1>Something went wrong</h1>
      <p>We could not load this page. Try again.</p>
      <button onClick={reset}>Try again</button>
    </section>
  );
}
