'use client';
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
