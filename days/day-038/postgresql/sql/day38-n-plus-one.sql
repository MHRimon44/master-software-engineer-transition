
-- DAY 38: N+1 QUERY OPTIMIZATION

-- APPROACH A: JOIN

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    o.id AS order_id,
    o.status,
    oi.product_id,
    oi.quantity,
    oi.unit_price
FROM orders o
LEFT JOIN order_items oi
    ON oi.order_id = o.id
WHERE o.customer_id = (
    SELECT id
    FROM customers
    WHERE email = 'mehedi@example.com'
)
ORDER BY o.created_at DESC;


-- APPROACH B: AGGREGATED RESPONSE

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    o.id AS order_id,
    o.status,
    COALESCE(
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'productId', oi.product_id,
                'quantity', oi.quantity,
                'unitPrice', oi.unit_price
            )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'::JSONB
    ) AS items
FROM orders o
LEFT JOIN order_items oi
    ON oi.order_id = o.id
WHERE o.customer_id = (
    SELECT id
    FROM customers
    WHERE email = 'mehedi@example.com'
)
GROUP BY o.id, o.status
ORDER BY o.id DESC;
