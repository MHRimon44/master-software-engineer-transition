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
