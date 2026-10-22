# Day 50 — DevFlow Dashboard

Next.js App Router foundations. Demo data is static; task checkboxes are client-only and reset after reload.

## Run

```bash
npm install
npm run typecheck
npm run dev
npm run build
```

Open http://localhost:3000 and try /projects, /projects/commerce, and /projects/missing.

## Concepts

- `app/layout.tsx`: shared root layout and metadata
- `app/projects/layout.tsx`: nested layout
- `app/projects/[id]/page.tsx`: dynamic route and `params` (async in Next 15)
- `generateStaticParams`: known project slugs
- `components/project-filter.tsx`: client-side search and category state
- `components/task-checklist.tsx`: client-side checkbox state (not persisted)
- `loading.tsx`, `error.tsx`, `not-found.tsx`: route UI boundaries

## DSA

From repository root, run `npx --yes tsx days/day-050/dsa/day50-search-rotated.ts` (requires network if tsx not installed), or use your common TypeScript runner.
