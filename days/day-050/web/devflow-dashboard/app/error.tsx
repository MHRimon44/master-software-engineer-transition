'use client';
import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);
  return (
    <div className="card">
      <h1>Something went wrong</h1>
      <p>We couldn't load this page.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
