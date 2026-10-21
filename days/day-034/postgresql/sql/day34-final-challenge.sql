-- =====================================================
-- DAY 34: FINAL PRACTICAL CHALLENGE
-- PostgreSQL Relationship Design
--
-- Relationships:
-- customers -> customer_profiles (1:1)
-- customers -> orders (1:N)
-- orders -> order_items (1:N)
-- products -> order_items (1:N)
--
-- orders <-> products (N:M)
-- =====================================================


-- =====================================================
-- CHALLENGE 1: CUSTOMER ORDER SUMMARY
-- =====================================================

SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    cp.city,

    COUNT(DISTINCT o.id) AS total_orders,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS total_units,

    COALESCE(
        SUM(oi.quantity * oi.unit_price),
        0
    ) AS total_order_value

FROM customers AS c

LEFT JOIN customer_profiles AS cp
    ON cp.customer_id = c.id

LEFT JOIN orders AS o
    ON o.customer_id = c.id

LEFT JOIN order_items AS oi
    ON oi.order_id = o.id

GROUP BY
    c.id,
    c.name,
    cp.city

ORDER BY total_order_value DESC;


-- =====================================================
-- CHALLENGE 2: CUSTOMER ORDER DETAILS
-- =====================================================

SELECT
    c.name AS customer_name,
    o.id AS order_id,
    o.status AS order_status,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price,

    oi.quantity * oi.unit_price AS line_total

FROM customers AS c

INNER JOIN orders AS o
    ON o.customer_id = c.id

INNER JOIN order_items AS oi
    ON oi.order_id = o.id

INNER JOIN products AS p
    ON p.id = oi.product_id

ORDER BY
    c.name,
    o.id,
    p.name;


-- =====================================================
-- CHALLENGE 3: VENDOR SALES SUMMARY
-- =====================================================

SELECT
    v.id AS vendor_id,
    v.name AS vendor_name,

    COUNT(DISTINCT o.id) AS total_orders,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS total_units,

    COALESCE(
        SUM(oi.quantity * oi.unit_price),
        0
    ) AS total_order_value

FROM vendors AS v

LEFT JOIN products AS p
    ON p.vendor_id = v.id

LEFT JOIN order_items AS oi
    ON oi.product_id = p.id

LEFT JOIN orders AS o
    ON o.id = oi.order_id

GROUP BY
    v.id,
    v.name

ORDER BY total_order_value DESC;


-- =====================================================
-- CHALLENGE 4: CUSTOMERS WITHOUT ORDERS
-- =====================================================

SELECT
    c.id,
    c.name,
    c.email

FROM customers AS c

LEFT JOIN orders AS o
    ON o.customer_id = c.id

WHERE o.id IS NULL;


-- =====================================================
-- CHALLENGE 5: PRODUCTS NEVER ORDERED
-- =====================================================

SELECT
    p.id,
    p.name,
    p.price,
    p.stock_quantity

FROM products AS p

LEFT JOIN order_items AS oi
    ON oi.product_id = p.id

WHERE oi.id IS NULL

ORDER BY p.name;


-- =====================================================
-- CHALLENGE 6: TOP 5 PRODUCTS BY ORDER VALUE
-- =====================================================

SELECT
    p.id AS product_id,
    p.name AS product_name,

    COALESCE(
        SUM(oi.quantity),
        0
    ) AS total_units,

    COALESCE(
        SUM(oi.quantity * oi.unit_price),
        0
    ) AS total_order_value

FROM products AS p

LEFT JOIN order_items AS oi
    ON oi.product_id = p.id

GROUP BY
    p.id,
    p.name

ORDER BY total_order_value DESC

LIMIT 5;