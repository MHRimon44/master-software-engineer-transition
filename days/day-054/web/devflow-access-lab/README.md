# Day 54 — DevFlow Access Lab

## Start

```bash
cp .env.example .env.local
openssl rand -base64 48
# Paste secret into AUTH_SECRET and set demo credentials in .env.local
npm install
npm run typecheck
npm run test:security
npm run dev
```

## Routes

- `/` public
- `/login` public login form
- `/dashboard` any authenticated user
- `/projects/manage` manager or admin
- `/admin` admin only
- `/api/admin/report` JSON endpoint with independent session and permission checks

## Role testing

Set `DEMO_ROLE=member`, restart and sign in. Confirm dashboard allowed; manage/admin denied.
Repeat with manager and admin. Clear cookies or logout between roles.

## Security limits

Educational single-user demo only. `.env.local` stores plaintext demo credentials; do not use this approach for real users. Use Auth.js or another mature provider, hashed passwords, rate limiting, user/session database, revocation, audit logs and resource-level authorization in production. The sample mutation does not persist data. Middleware is an early gate; sensitive server code rechecks permissions.
