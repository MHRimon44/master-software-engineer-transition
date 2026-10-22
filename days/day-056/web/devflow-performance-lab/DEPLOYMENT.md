# Day 56 production deployment plan (not executed)

1. Deploy NestJS + PostgreSQL separately using a managed database; configure private server-only DATABASE_URL and API credentials in backend deployment.
2. Deploy this Next.js app to a supported Node.js platform. Set NEXT_PUBLIC_SITE_URL to the actual HTTPS frontend origin.
3. Add real session validation and role/ownership checks from Day 55 at the server boundary BEFORE exposing private dashboard data. The current /dashboard is a public integration placeholder, NOT protected.
4. Use a server-side BFF or secure authenticated API requests for NestJS data; do not expose tokens in NEXT_PUBLIC_ variables.
5. Enable an approved error monitoring service with redaction; current console logging is a teaching placeholder, not production observability.
6. Run typecheck, build, smoke tests, Lighthouse, and accessibility checks. Inspect /sitemap.xml, /robots.txt and /opengraph-image. Ensure protected URLs are excluded from sitemap. robots.txt is NOT access control.
7. Record deployment URLs, health checks, rollback plan, and the Team Task API integration evidence before claiming Session 56 is done.

## Lighthouse evidence

Record route, device, mode, LCP, INP (field data where available), CLS, JS transfer, and a before/after observation in PERFORMANCE_BASELINE.md. Lighthouse lab measurements may use TBT rather than field INP.
