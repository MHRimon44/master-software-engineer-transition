# Team Task API Security Checklist

This document records the current API security controls, known risks, and
security requirements for future features.

## 1. Input Validation

### Current protections

- NestJS `ValidationPipe` is enabled globally.
- Unknown DTO properties are rejected with `forbidNonWhitelisted`.
- DTO input is transformed before reaching controllers.
- Email addresses are validated with `@IsEmail()`.
- Password length is bounded during registration.
- Task and project names have maximum lengths.
- Pagination values are restricted to valid integer ranges.
- Task status and sorting values use enum allowlists.
- Route IDs are validated with `PositiveIntPipe`.
- Optional `idempotency-key` values are normalized and limited to
  128 characters.

### Rules

- Never trust request body, query, route parameter, or header values.
- New request bodies must use validated DTOs.
- Numeric route parameters must be explicitly parsed and validated.
- Free-form strings should have reasonable maximum lengths.
- Prefer allowlists such as enums instead of accepting arbitrary values.

---

## 2. CORS

### Current protections

The API uses an explicit CORS allowlist configured through:

`CORS_ORIGINS`

Example:

`CORS_ORIGINS=http://localhost:3001,http://localhost:5173`

Wildcard origins are not used.

### Rules

- Never casually configure `origin: '*'`.
- Production origins must be explicitly listed.
- Development origins must not automatically become production origins.
- CORS must not be treated as authentication or authorization.
- API authentication and authorization must still protect every
  sensitive endpoint.

---

## 3. Security Headers

Helmet is enabled globally.

Current responses include security headers such as:

- Content-Security-Policy
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy
- Referrer-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options

### Rules

- Keep Helmet enabled in production.
- Review header configuration before weakening any default.
- HTTPS must be used in production.

---

## 4. Secrets Management

Secrets are loaded from environment variables.

Sensitive configuration includes:

- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `DATABASE_PASSWORD`

The local `.env` file is excluded from Git.

`.env.example` contains only safe placeholders and documents the
required environment variables.

### Rules

- Never commit `.env`.
- Never commit real JWT secrets, passwords, API keys, or credentials.
- Never log secret values.
- Production secrets must be supplied through the deployment
  environment or a secrets-management system.
- Development secrets must not be reused in production.
- Rotate a secret immediately if it is accidentally exposed.

---

## 5. Authentication and Authorization

Protected API routes use JWT access-token authentication.

Project-specific operations additionally use project role and
permission checks.

### Rules

- Never trust a user ID supplied in a request body as proof of identity.
- Identity must come from the verified authentication context.
- Authentication answers "Who is the user?"
- Authorization answers "Is this user allowed to perform this action?"
- New protected endpoints must explicitly apply the required guards.
- Refresh tokens and access tokens must never be written to application
  logs.

---

## 6. Sensitive Logging and Error Responses

Current request timing logs contain:

- HTTP method
- request URL
- request ID
- request duration

They do not intentionally log:

- passwords
- access tokens
- refresh tokens
- Authorization headers
- request bodies
- JWT secrets

Unhandled server errors are logged server-side while the client
receives a generic internal-server-error response.

### Rules

Never intentionally log:

- passwords
- Authorization headers
- access or refresh tokens
- JWT secrets
- database credentials
- API keys
- sensitive request bodies

Use request IDs for tracing instead of logging sensitive request data.

---

## 7. SQL Injection

### Current risk

The application uses TypeORM repositories for database access.

Repository APIs and parameterized query mechanisms should be preferred
instead of constructing SQL by concatenating user input.

### Unsafe example

Do not build queries like:

`"SELECT * FROM users WHERE email = '" + email + "'"`

User-controlled input inserted directly into SQL can change the meaning
of the query.

### Required mitigation

- Use TypeORM repository methods.
- Use QueryBuilder parameters when custom queries are required.
- Never concatenate request values into SQL strings.
- Validate and constrain user-controlled filter and sorting fields.
- Keep database permissions limited to what the application requires.

### Review trigger

Any future raw SQL must receive an explicit SQL-injection review.

---

## 8. Server-Side Request Forgery (SSRF)

### Current status

The API does not currently expose a feature that accepts a user-provided
URL and fetches that URL from the server.

Therefore, the current SSRF attack surface is limited.

### Future risk

SSRF becomes relevant if features are added such as:

- URL previews
- webhook testing
- remote image downloads
- importing files from URLs
- external feed imports
- callbacks to user-provided URLs

An attacker may attempt to make the server request:

- localhost services
- private network services
- cloud metadata endpoints
- internal administration endpoints
- unexpected protocols or ports

### Required mitigation

If server-side URL fetching is introduced:

- Parse URLs using a trusted URL parser.
- Allow only required protocols, normally HTTPS.
- Prefer an allowlist of trusted hosts when possible.
- Reject localhost and loopback destinations.
- Reject private and link-local network destinations.
- Restrict unexpected ports.
- Apply connection and response timeouts.
- Limit redirects and validate redirect destinations.
- Limit response size.
- Never return internal service responses directly without validation.

### Review trigger

Any feature that causes the server to connect to a URL influenced by a
client must receive an SSRF security review before release.

---

## 9. File Upload Security

### Current status

The API does not currently provide a file-upload endpoint.

### Future risk

If file uploads are added, risks may include:

- malicious executable files
- oversized files
- denial-of-service through repeated uploads
- path traversal
- filename collisions
- misleading file extensions
- unexpected MIME types
- publicly accessible sensitive files

### Required mitigation

Before implementing file uploads:

- Set a strict maximum file size.
- Allow only required file types.
- Validate file content where practical instead of trusting only the
  filename extension.
- Do not trust the client-provided MIME type alone.
- Generate server-controlled filenames.
- Never use an untrusted filename directly as a filesystem path.
- Prevent path traversal.
- Store uploads outside executable application directories.
- Apply authentication and authorization to upload endpoints.
- Rate-limit upload operations where appropriate.
- Consider malware scanning when the application's threat model
  requires it.
- Do not expose uploaded files publicly by default.

### Review trigger

Any file-upload feature must receive a dedicated security review before
release.

---

## 10. Pre-Deployment Security Checklist

Before deploying the API:

- [ ] Production secrets are different from development secrets.
- [ ] `.env` and other secret files are not committed.
- [ ] CORS contains only expected production origins.
- [ ] Helmet/security headers are enabled.
- [ ] HTTPS is enabled.
- [ ] Authentication is required for protected endpoints.
- [ ] Project authorization rules are enforced.
- [ ] All request DTOs are validated.
- [ ] Route parameters are validated.
- [ ] Query parameters are bounded and allowlisted where appropriate.
- [ ] Sensitive values are not written to logs.
- [ ] Database queries do not concatenate untrusted input.
- [ ] Any server-side URL fetching has been reviewed for SSRF.
- [ ] Any file-upload functionality has been reviewed separately.
- [ ] Unit, integration, and E2E tests pass.
