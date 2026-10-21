# Day 53 — DevFlow Auth Lab

## Run

1. `cp .env.example .env.local`
2. Generate a secret: `openssl rand -base64 48` and paste it into `AUTH_SECRET`.
3. Set a unique `DEMO_PASSWORD` and your preferred `DEMO_EMAIL`.
4. `npm install && npm run typecheck && npm run dev`
5. Open http://localhost:3000.

## Manual checks

- Unauthenticated `/dashboard` redirects to `/login`.
- Invalid credentials show a generic error.
- Correct credentials set an HttpOnly session cookie and redirect to dashboard.
- `/admin` is accessible only when `DEMO_ROLE=admin`; `member` sees a forbidden message.
- Logout removes the cookie and returns to login.
- Modify the cookie or wait one hour: the session should be rejected.

## Security boundaries

**Educational demo only. Do not deploy this as a production authentication system.** Credentials come from environment variables, not a password-hashed user database. There is no login rate limiting, MFA, email verification, account lockout, persistent session revocation, CSRF threat-model review, or audit trail. The signed cookie is integrity-protected but **not encrypted**; do not store secrets or personal data in its payload. HTTPS is mandatory in production. Use a mature authentication library/provider and server-side session store for real apps. Route protection is enforced in Server Components; every additional Route Handler or Server Action must independently authorize requests.
