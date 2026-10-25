# Day 61 — Docker Compose Full Local Stack

## Overview

This project runs three services using Docker Compose:

- Next.js 15 frontend
- NestJS backend API
- PostgreSQL 17 database

## Prerequisites

- Docker Desktop
- Docker Compose

## Getting Started

From the `days/day-061/docker` directory:

```bash
cp .env.example .env
docker compose up -d --build
```

## Local URLs

| Service       | URL                           |
| ------------- | ----------------------------- |
| Next.js       | http://localhost:3004         |
| NestJS API    | http://localhost:3003         |
| API health    | http://localhost:3003/health  |
| Database test | http://localhost:3003/db-test |

## Internal Docker Networking

Containers communicate using service names:

- Next.js → NestJS: `http://api:3000`
- NestJS → PostgreSQL: `db:5432`

The database is not published to the host.

## Useful Commands

```bash
docker compose ps
docker compose logs -f
docker compose logs --tail=50 web
docker compose up -d --build
docker compose down
```

## Database Persistence

PostgreSQL data is stored in the named volume:

`day61-fullstack_pgdata`

The volume survives container recreation and normal `docker compose down`.

**Warning:** `docker compose down -v` deletes the volume and may permanently remove local database data.

## Health Checks

PostgreSQL uses `pg_isready`.

NestJS checks `/health`, which verifies the database connection.

The frontend starts after the API is healthy.

## Environment Variables

Copy `.env.example` to `.env` and adjust local settings.

Never commit real passwords or secrets.

## Known Limitation

The Next.js and NestJS containers can communicate over the Docker network, but the frontend application does not yet consume the backend API in its UI.
