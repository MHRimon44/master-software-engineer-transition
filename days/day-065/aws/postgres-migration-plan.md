# Day 65 — PostgreSQL Migration Plan

## Goal

Migrate the existing Docker-based PostgreSQL
database to Amazon RDS PostgreSQL.

## 1. Before Migration

1. Identify PostgreSQL source version.
2. Select a compatible RDS PostgreSQL version.
3. Check installed extensions and dependencies.
4. Estimate database size.
5. Identify application downtime requirements.
6. Take a verified backup.
7. Prepare private connectivity to RDS.

## 2. Export Local Database

Example:

pg_dump \
--host=localhost \
--port=5432 \
--username=postgres \
--format=custom \
--file=backup.dump \
appdb

This is an illustrative command.
Adjust host, port, user and database name.

The dump may contain sensitive data.
Do not commit it to Git.

## 3. Prepare RDS

1. Create private RDS PostgreSQL.
2. Configure database security group.
3. Configure credentials securely.
4. Enable appropriate backup settings.
5. Verify connectivity from an authorized
   network location.

A local laptop cannot automatically connect
to a private RDS instance.

A secure network path is required.

## 4. Restore Data

Example:

pg_restore \
--host=RDS_ENDPOINT \
--port=5432 \
--username=DB_USER \
--dbname=appdb \
--no-owner \
backup.dump

The target database and required permissions
must be prepared before restore.

Use appropriate TLS connection settings.

## 5. Application Configuration

Update NestJS database configuration using
environment variables or secret injection.

Example variable names:

DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
DB_SSL

Never store production values in source control.

## 6. Verification

- [ ] Schema exists
- [ ] Tables exist
- [ ] Expected row counts match
- [ ] Application can read data
- [ ] Application can write data
- [ ] Critical queries work
- [ ] Migrations are consistent
- [ ] Backups and restore are tested

## 7. Cutover

1. Schedule maintenance if required.
2. Stop or coordinate application writes.
3. Perform final data synchronization.
4. Switch application database configuration.
5. Deploy and verify the application.
6. Monitor errors and performance.
7. Keep a tested rollback strategy.

## 8. Status

Migration plan only.

No RDS instance or live migration performed.
