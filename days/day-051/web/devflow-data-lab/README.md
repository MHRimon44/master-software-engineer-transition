# Day 51 — DevFlow Data Lab

## Requirements
Node.js 20+ and internet access for the external JSONPlaceholder example.

## Run
```bash
npm install
npm run typecheck
npm run dev
npm run build
```

Open http://localhost:3000, /cached, /fresh, and /api/projects.

## What to observe
- `app/api/projects/route.ts` exposes static sample data as JSON.
- `/cached` uses an external fetch with `next: { revalidate: 60 }`.
- `/fresh` uses `cache: 'no-store'` and `dynamic = 'force-dynamic'`.
- A server-render timestamp is **not** a reliable cache-hit indicator. For actual cache measurements, inspect server/network instrumentation in a production build.
- Both external pages display a fallback when the public API is unavailable.
- No database or mutation persistence is included.

## Production check
`npm run build && npm run start`
