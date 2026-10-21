# Day 42 — PostgreSQL Operational Checkpoint

## Environment

- PostgreSQL: 17
- Database: postgres-lab
- Application role: marketplace_app_day42
- Restore database: postgres_lab_day42_restore

## Connection Pooling

Connection pools reuse existing connections.

PgBouncer is an external PostgreSQL connection
pooler. Pool size should be tuned based on
database capacity and application concurrency.

## Least-Privilege Role

Application role:

- No superuser
- No CREATEDB
- No CREATEROLE
- Limited table access
- Audit UPDATE/DELETE denied

## Backup & Restore

Backup format: custom (-Fc)
Backup path: backups/day42-postgres-lab.dump

Restore:

- Separate database
- --no-owner
- --no-acl
- --exit-on-error

Verification:
Compare table counts between source and restore.

## Maintenance

VACUUM reclaims reusable space from obsolete
row versions.

ANALYZE updates planner statistics.

Autovacuum normally handles routine maintenance.

## SQL Drills

1. Top completed-order revenue products
2. Customers inactive for 90 days
3. Vendor completed revenue
4. Keyset pagination

## ORM vs Raw SQL

ORM used:
[Fill in actual ORM name]

Generated SQL:
[Paste captured query]

Hand-written SQL:
sql/day42-query-comparison.sql

Execution plan differences:
[Record after running both]

Conclusion:
[Record actual findings]

## Final Interview Readiness

I can explain:

- Normalization and foreign keys
- Transactions and isolation
- Indexes and EXPLAIN
- Window functions
- JSONB and GIN
- Schema migrations
- Audit records
- Roles and permissions
- Backup and restore
- Connection pooling
- Keyset pagination
