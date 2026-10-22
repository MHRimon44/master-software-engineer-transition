import Link from 'next/link';
export default function Home() {
  return (
    <>
      <span className="pill">Day 56 · Core Web Vitals</span>
      <h1>Make the experience faster, not just the build.</h1>
      <p className="muted">
        Explore image sizing, code splitting, Web Vitals and performance measurement in a working
        Next.js application.
      </p>
      <div className="grid">
        <article className="card">
          <p className="metric">LCP</p>
          <p>Largest Contentful Paint</p>
          <p className="muted">Aim for ≤ 2.5 s at the 75th percentile.</p>
        </article>
        <article className="card">
          <p className="metric">INP</p>
          <p>Interaction to Next Paint</p>
          <p className="muted">Aim for ≤ 200 ms.</p>
        </article>
        <article className="card">
          <p className="metric">CLS</p>
          <p>Cumulative Layout Shift</p>
          <p className="muted">Aim for ≤ 0.1.</p>
        </article>
      </div>
      <h2>Hands-on labs</h2>
      <div className="grid">
        <article className="card">
          <h3>Image optimization</h3>
          <p>Use next/image with intrinsic dimensions, sizes and priority.</p>
          <Link href="/images">Open image lab →</Link>
        </article>
        <article className="card">
          <h3>Code splitting</h3>
          <p>Load an interactive chart only when requested.</p>
          <Link href="/interactive">Open interaction lab →</Link>
        </article>
      </div>
      <h2>Production measurement</h2>
      <p>
        Run <span className="code">npm run build</span> then{' '}
        <span className="code">npm run start</span>. Open Chrome DevTools → Lighthouse or
        Performance to record a baseline before changing code.
      </p>
    </>
  );
}
