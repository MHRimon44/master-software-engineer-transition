
-- =====================================================
-- DAY 39: DISTINCT ON & LATEST ORDER EVENT
-- Database: postgres-lab
-- =====================================================

-- PART 1: CREATE ORDER EVENT HISTORY

CREATE TABLE IF NOT EXISTS order_events (
    id BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    order_id BIGINT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    event_type VARCHAR(50) NOT NULL,

    event_note TEXT,

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT NOW()
);


-- PART 2: ADD INDEX

CREATE INDEX IF NOT EXISTS
    idx_order_events_latest

ON order_events (
    order_id,
    created_at DESC,
    id DESC
);


-- PART 3: SEED EVENTS
-- Insert events only for an order with no history.
-- Re-running this script will not duplicate seed events.

WITH selected_order AS (
    SELECT o.id
    FROM orders o
    WHERE NOT EXISTS (
        SELECT 1
        FROM order_events e
        WHERE e.order_id = o.id
    )
    ORDER BY o.id
    LIMIT 1
)

INSERT INTO order_events (
    order_id,
    event_type,
    event_note,
    created_at
)

SELECT
    so.id,
    event_data.event_type,
    event_data.event_note,
    NOW() - event_data.age

FROM selected_order so

CROSS JOIN (
    VALUES
        (
            'created',
            'Order created',
            INTERVAL '30 minutes'
        ),
        (
            'confirmed',
            'Order confirmed',
            INTERVAL '20 minutes'
        ),
        (
            'packed',
            'Order packed',
            INTERVAL '10 minutes'
        )
) AS event_data(
    event_type,
    event_note,
    age
);


-- PART 4: VIEW ALL EVENTS

SELECT
    order_id,
    event_type,
    event_note,
    created_at
FROM order_events
ORDER BY
    order_id,
    created_at,
    id;


-- PART 5: LATEST EVENT PER ORDER

SELECT DISTINCT ON (order_id)
    order_id,
    event_type,
    event_note,
    created_at,
    id

FROM order_events

ORDER BY
    order_id,
    created_at DESC,
    id DESC;


-- PART 6: ALTERNATIVE USING ROW_NUMBER

WITH ranked_events AS (
    SELECT
        order_id,
        event_type,
        event_note,
        created_at,
        id,

        ROW_NUMBER() OVER (
            PARTITION BY order_id
            ORDER BY
                created_at DESC,
                id DESC
        ) AS rn

    FROM order_events
)

SELECT
    order_id,
    event_type,
    event_note,
    created_at

FROM ranked_events

WHERE rn = 1

ORDER BY order_id;


-- PART 7: VERIFY EVENT COUNTS

SELECT
    order_id,
    COUNT(*) AS event_count

FROM order_events

GROUP BY order_id

ORDER BY order_id;
