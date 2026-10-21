
-- =====================================================
-- DAY 42: RAW SQL QUERY COMPARISON
-- =====================================================

-- Business requirement:
-- Get completed-order revenue per customer.

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    c.id,
    c.name,

    COUNT(DISTINCT o.id)
        AS completed_orders,

    COALESCE(
        SUM(
            oi.quantity * oi.unit_price
        ),
        0
    ) AS total_revenue

FROM customers c

JOIN orders o
    ON o.customer_id = c.id
   AND o.status = 'completed'

JOIN order_items oi
    ON oi.order_id = o.id

GROUP BY
    c.id,
    c.name

ORDER BY
    total_revenue DESC,
    c.id ASC

LIMIT 10;
