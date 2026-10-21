# Team Task API Release Notes

## v0.1.0

### Overview

v0.1.0 marks the first backend architecture checkpoint for the Team Task API.

The API now includes authentication, authorization, persistence, caching,
background work, operational health checks, structured request logging,
graceful shutdown, and OpenAPI documentation.

### Core API

- NestJS modular backend architecture
- PostgreSQL persistence with TypeORM
- Database migrations
- User registration and login
- JWT access and refresh token lifecycle
- Project management
- Project membership and role-based authorization
- Task management
- Pagination, filtering, sorting, and search

### Security and Reliability

- Password hashing
- Global request validation
- Helmet security headers
- CORS allowlist
- Rate limiting
- Request IDs
- Centralized exception handling
- Idempotency-key validation

### Caching

- Redis integration
- Cache-aside strategy for `GET /projects`
- 60-second project cache TTL
- Cache invalidation after project creation

### Background Work

- In-process background notification execution
- Retry support
- Exponential backoff
- Project-created notification example

### Operations

- `GET /health`
- PostgreSQL health check
- Redis health check
- Application uptime and health timestamp
- Structured HTTP request logs
- Request duration logging
- Graceful application shutdown
- Redis connection cleanup during shutdown

### API Documentation

- Swagger UI available at `/docs`
- OpenAPI JSON available at `/docs-json`
- Bearer authentication configured in Swagger
- OpenAPI version `0.1.0`

### Testing

The backend includes unit tests for core services, controllers,
authorization behavior, caching, and background notification scheduling.

### Current Architecture Limitations

- Background jobs currently execute in-process and are not durable.
- A process crash can lose pending background work.
- Redis is currently treated as required application infrastructure.
- Notification delivery currently uses a logging implementation rather
  than an external email or push provider.
- WebSocket and scheduled cron workloads are not required by the current
  application flow and are not implemented in v0.1.0.

### Future Production Evolution

Background work can later move to a durable queue architecture such as:

API → Redis/Queue → Worker → Notification Provider

WebSocket gateways can be introduced when real-time client updates are
required, while cron jobs can be introduced for scheduled maintenance or
periodic workloads.
