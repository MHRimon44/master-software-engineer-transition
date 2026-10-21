# Day 49 — TaskBoard Testing Lab

## Setup
```bash
npm install
npm run typecheck
npm run test
npm run build
```

## Browser test (optional)
```bash
npx playwright install chromium
npm run test:e2e
```

The development server has no live backend: `/api/tasks` is intentionally mocked in tests. For a manual demo, open DevTools > Network and use a mock server or adapt `loadTasks()` to a real endpoint. The UI will show an API error if no backend is available.

## Red-green test experiment
In `src/App.tsx`, temporarily change `Task title is required` to `Missing title`, then run `npm test`. Observe failure. Restore original text and rerun to get green.

## What to test
- Validation and submission via roles/labels
- Async loading and error UI via MSW
- Browser happy path via Playwright route interception
- No assertions against internal hook state
