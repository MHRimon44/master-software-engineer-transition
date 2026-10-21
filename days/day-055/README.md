# Day 55 — Next.js Testing Lab

## Setup
```bash
cd web/devflow-quality-lab
npm install
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

## Important scope
This lab tests pure RBAC rules, a role-checked mutation function, React form interaction, and browser navigation. It **does not implement authenticated sessions or truly protected Next.js routes**. `/admin` is deliberately public. The authorization function is a testable demonstration, not an exposed Server Action. To test real protected routes, integrate the secure authentication and session architecture from Day 53/54, then add HTTP-level 401/403 tests.

The Vitest config includes only `*.test.ts(x)` files so Playwright specs are not collected by Vitest. Cleanup runs after each RTL test.
