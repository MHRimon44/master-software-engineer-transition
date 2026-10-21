
-- =====================================================
-- DAY 42: SQL DRILLS
-- Database: postgres-lab
-- =====================================================

-- =====================================================
-- DRILL 1: TOP REVENUE PRODUCTS
-- Only completed orders count as revenue.
-- =====================================================

SELECT
    p.id AS product_id,
    p.name AS product_name,
    v.name AS vendor_name,

    SUM(
        oi.quantity * oi.unit_price
    ) AS total_revenue,

    SUM(oi.quantity) AS units_sold

FROM order_items oi

JOIN orders o
    ON o.id = oi.order_id

JOIN products p
    ON p.id = oi.product_id

JOIN vendors v
    ON v.id = p.vendor_id

WHERE o.status = 'completed'

GROUP BY
    p.id,
    p.name,
    v.id,
    v.name

ORDER BY
    total_revenue DESC,
    product_id ASC

LIMIT 10;


-- =====================================================
-- DRILL 2: INACTIVE CUSTOMERS
-- Customers with no orders in the last 90 days.
-- Customers who never ordered are also included.
-- =====================================================

SELECT
    c.id,
    c.name,
    c.email,
    MAX(o.created_at) AS last_order_at

FROM customers c

LEFT JOIN orders o
    ON o.customer_id = c.id

GROUP BY
    c.id,
    c.name,
    c.email

HAVING
    MAX(o.created_at) IS NULL
    OR MAX(o.created_at) <
        NOW() - INTERVAL '90 days'

ORDER BY
    last_order_at ASC NULLS FIRST,
    c.id ASC;


-- =====================================================
-- DRILL 3: VENDOR TOTALS
-- Show vendors even with zero completed sales.
-- =====================================================

SELECT
    v.id AS vendor_id,
    v.name AS vendor_name,

    COUNT(DISTINCT p.id)
        AS total_products,

    COALESCE(
        SUM(
            CASE
                WHEN o.status = 'completed'
                THEN oi.quantity * oi.unit_price
                ELSE 0
            END
        ),
        0
    ) AS completed_revenue

FROM vendors v

LEFT JOIN products p
    ON p.vendor_id = v.id

LEFT JOIN order_items oi
    ON oi.product_id = p.id

LEFT JOIN orders o
    ON o.id = oi.order_id

GROUP BY
    v.id,
    v.name

ORDER BY
    completed_revenue DESC,
    v.id ASC;


-- =====================================================
-- DRILL 4: KEYSET PAGINATION
-- Stable ordering using created_at and id.
-- =====================================================

-- First page

SELECT
    id,
    name,
    price,
    created_at
FROM products
ORDER BY created_at DESC, id DESC
LIMIT 10;


-- Next page:
-- Cursor values must come from the last row
-- of the previous page.
--
-- Replace the example values with real cursor
-- values from your own query output.
--
-- SELECT
--     id,
--     name,
--     price,
--     created_at
-- FROM products
-- WHERE (created_at, id) <
--       (
--           '2026-10-01T10:00:00+06:00'::timestamptz,
--           100::bigint
--       )
-- ORDER BY created_at DESC, id DESC
-- LIMIT 10;


-- =====================================================
-- SUPPORTING INDEX FOR KEYSET PAGINATION
-- =====================================================

CREATE INDEX IF NOT EXISTS
    idx_products_created_id_desc
ON products (
    created_at DESC,
    id DESC
);


-- Query plan

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    name,
    price,
    created_at
FROM products
ORDER BY created_at DESC, id DESC
LIMIT 10;
