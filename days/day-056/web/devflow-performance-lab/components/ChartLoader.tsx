'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p role="status">Loading chart…</p>,
  ssr: false,
});
export default function ChartLoader() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow((s) => !s)}>
        {show ? 'Hide chart' : 'Load interactive chart'}
      </button>
      {show && (
        <div className="box">
          <HeavyChart />
        </div>
      )}
    </>
  );
}
