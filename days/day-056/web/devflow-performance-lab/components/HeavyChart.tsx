'use client';
import { useMemo, useState } from 'react';
export default function HeavyChart() {
  const [count, setCount] = useState(8);
  const values = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => Math.round(30 + 60 * Math.abs(Math.sin(i * 1.7)))),
    [count],
  );
  return (
    <div className="card">
      <h2>On-demand interactive chart</h2>
      <p className="muted">
        This module is loaded only after you click the button on the previous screen.
      </p>
      <label>
        Bars: {count}{' '}
        <input
          aria-label="Bar count"
          type="range"
          min="3"
          max="18"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          height: 180,
          gap: 6,
          marginTop: 18,
        }}
      >
        {values.map((v, i) => (
          <div
            key={i}
            title={String(v)}
            style={{
              height: `${v}%`,
              flex: 1,
              background: '#2475b3',
              borderRadius: '5px 5px 0 0',
            }}
          />
        ))}
      </div>
    </div>
  );
}
