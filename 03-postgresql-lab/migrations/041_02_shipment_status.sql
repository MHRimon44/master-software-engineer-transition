
-- =====================================================
-- DAY 41 MIGRATION 2
-- Add out_for_delivery shipment status
-- =====================================================

BEGIN;

ALTER TABLE shipment_events
DROP CONSTRAINT chk_shipment_event_type;

ALTER TABLE shipment_events
ADD CONSTRAINT chk_shipment_event_type
CHECK (
    event_type IN (
        'created',
        'packed',
        'shipped',
        'out_for_delivery',
        'delivered'
    )
);

COMMIT;
