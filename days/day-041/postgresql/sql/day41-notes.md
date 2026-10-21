# Day 41 — Data Integrity & Audit Decisions

## Shipment Events

- Table: shipment_events
- Parent: orders
- FK: ON DELETE RESTRICT

Reason:
Shipment history should not silently disappear
when an order is deleted.

## Audit Log

- Table: audit_log
- Optional order reference: ON DELETE SET NULL

Reason:
Audit records should remain available even if
the related order is removed.

- Actor: actor_type + actor_id
- Action: action
- Time: created_at
- Context: JSONB

## Append-only Protection

A database trigger rejects UPDATE and DELETE.

Limitation:
Database owners and privileged administrators
can potentially bypass this protection.

Production requires least-privilege roles
and an appropriate audit retention policy.

## Migration Order

1. 041_01_shipment_audit.sql
2. 041_02_shipment_status.sql

Migration 2 adds:
out_for_delivery

## Deferrable FK

DEFERRABLE INITIALLY DEFERRED permits a
constraint check to wait until transaction end.

Use only when transaction design requires it.

## Test Strategy

- Run migrations on postgres-lab.
- Run integrity tests inside a transaction.
- ROLLBACK temporary test changes.
- Confirm audit mutations are rejected.
- Confirm invalid statuses are rejected.
- Confirm FK references are enforced.

## Production Checklist

- Review existing schema before migration.
- Back up database before risky changes.
- Test migrations on staging.
- Use migration history tracking.
- Use least-privilege database roles.
- Avoid storing secrets in audit context.
- Document retention and deletion policies.
