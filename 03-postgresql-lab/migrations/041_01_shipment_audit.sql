
-- =====================================================
-- DAY 41 MIGRATION 1
-- Shipment Events + Audit Log
-- Database: postgres-lab
-- =====================================================

BEGIN;

-- 1. Shipment events

CREATE TABLE IF NOT EXISTS shipment_events (
    id BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    order_id BIGINT NOT NULL,

    event_type VARCHAR(40) NOT NULL,

    event_note TEXT,

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT NOW(),

    CONSTRAINT fk_shipment_events_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_shipment_event_type
        CHECK (
            event_type IN (
                'created',
                'packed',
                'shipped',
                'delivered'
            )
        )
);


-- 2. Audit log

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    order_id BIGINT,

    actor_type VARCHAR(30) NOT NULL,

    actor_id TEXT NOT NULL,

    action VARCHAR(100) NOT NULL,

    entity_type VARCHAR(50) NOT NULL,

    entity_id TEXT NOT NULL,

    context JSONB NOT NULL
        DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT NOW(),

    CONSTRAINT fk_audit_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_audit_actor_type
        CHECK (
            actor_type IN (
                'user',
                'admin',
                'system'
            )
        ),

    CONSTRAINT chk_audit_context_object
        CHECK (
            jsonb_typeof(context) = 'object'
        )
);


-- 3. Append-only protection
-- Reject updates and deletes.

CREATE OR REPLACE FUNCTION prevent_audit_mutation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION
        'audit_log is append-only: % not allowed',
        TG_OP;
END;
$$;


DROP TRIGGER IF EXISTS
    trg_prevent_audit_mutation
ON audit_log;

CREATE TRIGGER trg_prevent_audit_mutation
BEFORE UPDATE OR DELETE
ON audit_log
FOR EACH ROW
EXECUTE FUNCTION prevent_audit_mutation();


-- 4. Indexes

CREATE INDEX IF NOT EXISTS
    idx_shipment_events_order_created
ON shipment_events (
    order_id,
    created_at DESC,
    id DESC
);

CREATE INDEX IF NOT EXISTS
    idx_audit_log_entity_created
ON audit_log (
    entity_type,
    entity_id,
    created_at DESC
);

CREATE INDEX IF NOT EXISTS
    idx_audit_log_order
ON audit_log (order_id);


COMMIT;
