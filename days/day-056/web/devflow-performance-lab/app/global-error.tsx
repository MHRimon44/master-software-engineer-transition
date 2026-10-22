'use client';
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Application error</h1>
          <p>Please try again.</p>
          <button onClick={reset}>Retry</button>
        </main>
      </body>
    </html>
  );
}
