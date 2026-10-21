
-- DAY 41: CORRECTED INTEGRITY TESTS
-- Run after both migrations.
-- Requires at least one existing order.

BEGIN;

DO $$
DECLARE
    v_order_id BIGINT;
    v_shipment_id BIGINT;
    v_audit_id BIGINT;
BEGIN
    SELECT id INTO v_order_id
    FROM orders ORDER BY id LIMIT 1;

    IF v_order_id IS NULL THEN
        RAISE EXCEPTION 'No order exists for testing';
    END IF;

    INSERT INTO shipment_events (
        order_id, event_type, event_note
    )
    VALUES (
        v_order_id, 'created', 'Day41 test'
    )
    RETURNING id INTO v_shipment_id;

    RAISE NOTICE 'PASS | Shipment created';

    INSERT INTO shipment_events (
        order_id, event_type
    )
    VALUES (v_order_id, 'out_for_delivery');

    RAISE NOTICE 'PASS | New status accepted';

    BEGIN
        INSERT INTO shipment_events (
            order_id, event_type
        )
        VALUES (v_order_id, 'invalid_status');

        RAISE EXCEPTION 'FAIL | Invalid status accepted';
    EXCEPTION
        WHEN check_violation THEN
            RAISE NOTICE 'PASS | Invalid status rejected';
    END;

    INSERT INTO audit_log (
        order_id, actor_type, actor_id,
        action, entity_type, entity_id, context
    )
    VALUES (
        v_order_id,
        'system',
        'day41-test',
        'shipment.created',
        'shipment',
        v_shipment_id::TEXT,
        '{"test":true}'::jsonb
    )
    RETURNING id INTO v_audit_id;

    RAISE NOTICE 'PASS | Audit inserted';

    BEGIN
        UPDATE audit_log
        SET action = 'changed'
        WHERE id = v_audit_id;

        RAISE EXCEPTION 'FAIL | Audit update accepted';
    EXCEPTION
        WHEN raise_exception THEN
            IF SQLERRM NOT LIKE
                'audit_log is append-only:%'
            THEN
                RAISE;
            END IF;

            RAISE NOTICE 'PASS | Audit update rejected';
    END;

    BEGIN
        DELETE FROM audit_log
        WHERE id = v_audit_id;

        RAISE EXCEPTION 'FAIL | Audit delete accepted';
    EXCEPTION
        WHEN raise_exception THEN
            IF SQLERRM NOT LIKE
                'audit_log is append-only:%'
            THEN
                RAISE;
            END IF;

            RAISE NOTICE 'PASS | Audit delete rejected';
    END;

    -- Explicitly verify the shipment FK exists
    -- and is configured with RESTRICT.

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'fk_shipment_events_order'
          AND contype = 'f'
          AND confdeltype = 'r'
          AND conrelid =
              'shipment_events'::regclass
    ) THEN
        RAISE EXCEPTION
            'FAIL | Shipment RESTRICT FK missing';
    END IF;

    RAISE NOTICE 'PASS | Shipment RESTRICT FK verified';

END;
$$;

ROLLBACK;
