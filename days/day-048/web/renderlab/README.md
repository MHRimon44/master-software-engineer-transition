# Day 48 — RenderLab

React + TypeScript + Vite performance learning project.

## Run

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Profiling experiment

1. Install React Developer Tools browser extension.
2. Open Profiler, start recording.
3. In baseline mode, click the unrelated counter button; observe row renders.
4. Switch optimized mode on, record a separate counter click; compare row renders.
5. Toggle a single task and inspect which rows render.
6. Open Insights and inspect Network tab for lazy-loaded chunk.

Caution: React StrictMode can double-invoke rendering in development. Production timings vary. The score computation is intentionally synthetic. `useMemo` is used for the derived list because sorting can be costly; `useCallback` stabilizes row callbacks only in optimized mode. `React.memo` is not a universal performance improvement.

## DSA

```bash
npm run dsa -- 48
npm --prefix common/typescript run typecheck
```

Time O(N log k) for N total nodes across k sorted lists; auxiliary heap space O(k), excluding output.
