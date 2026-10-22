# Day 56 — DevFlow Performance Lab

## Run

```bash
npm install
npm run typecheck
npm run dev
```

Visit /, /images and /interactive.

## Verify production

```bash
npm run build
npm run start
```

## Exercises

1. Record a Lighthouse baseline in production mode.
2. Inspect the image element and confirm intrinsic sizing and responsive `sizes`.
3. Open Network → JS and click Load interactive chart; inspect the chunk loaded on demand.
4. Record LCP, INP and CLS on your device.
5. Replace the local SVG with a real photograph and compare formats and transfer size.

Note: the illustration is an SVG, so this lab demonstrates image layout and the Image API, not photographic compression gains. Web Vitals log only in development and may not all appear without real user interactions.

## Day 56 completion patch

Added sitemap, robots, Open Graph preview, metadata, accessible local-only feedback form, skip link, route error boundaries, 404, deployment plan and baseline template. Original performance routes and Histogram DSA remain.

**Security:** `/dashboard` is intentionally a PUBLIC placeholder and contains no private data. It is not a protected route. Real authorization and role-based navigation must be integrated with the existing Day 55/NestJS backend and verified separately.

Run `npm install`, `npm run typecheck`, `npm run build`, `npm run start`. Check `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/feedback`, `/dashboard`. No performance or integration results are claimed.
