
-- ================================================
-- DAY 42: LEAST-PRIVILEGE APPLICATION ROLE
-- Run as local database owner/admin.
-- ================================================

-- Create role without a password initially.
-- Set a strong password separately with \password
-- in an interactive psql session.

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_roles
        WHERE rolname = 'marketplace_app_day42'
    ) THEN
        CREATE ROLE marketplace_app_day42
            LOGIN
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            NOREPLICATION;
    END IF;
END;
$$;

-- Ensure existing role also has these restrictions.
ALTER ROLE marketplace_app_day42
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION;

GRANT CONNECT
ON DATABASE "postgres-lab"
TO marketplace_app_day42;

GRANT USAGE
ON SCHEMA public
TO marketplace_app_day42;

-- Start by removing direct table and sequence grants
-- previously granted to this role in public.
-- Do not modify grants belonging to other roles.

REVOKE ALL PRIVILEGES
ON ALL TABLES IN SCHEMA public
FROM marketplace_app_day42;

REVOKE ALL PRIVILEGES
ON ALL SEQUENCES IN SCHEMA public
FROM marketplace_app_day42;

-- Product/catalog reads
GRANT SELECT ON
    customers,
    vendors,
    products,
    orders,
    order_items
TO marketplace_app_day42;

-- Shipment events: append/read only
GRANT SELECT, INSERT
ON shipment_events
TO marketplace_app_day42;

-- Audit log: append/read only
GRANT SELECT, INSERT
ON audit_log
TO marketplace_app_day42;

-- Identity sequences for inserts
GRANT USAGE
ON SEQUENCE
    shipment_events_id_seq,
    audit_log_id_seq
TO marketplace_app_day42;
