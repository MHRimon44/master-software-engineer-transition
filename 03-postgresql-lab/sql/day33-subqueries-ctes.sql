-- =========================================================
-- DAY 33: PostgreSQL
-- Topic: Subqueries, CTEs and Self JOIN
-- Database: postgres-lab
-- =========================================================


-- =========================================================
-- 1. SUBQUERY
-- Find products whose price is greater than average price
-- =========================================================

SELECT
    id,
    name,
    price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
)
ORDER BY price DESC;


-- =========================================================
-- 2. CTE (Common Table Expression)
-- Rewrite the previous subquery using WITH
-- =========================================================

WITH average_product_price AS (
    SELECT
        AVG(price) AS avg_price
    FROM products
)
SELECT
    p.id,
    p.name,
    p.price,
    ROUND(a.avg_price, 2) AS average_price
FROM products AS p
CROSS JOIN average_product_price AS a
WHERE p.price > a.avg_price
ORDER BY p.price DESC;


-- =========================================================
-- 3. PRACTICAL CTE: VENDOR-WISE SALES REPORT
-- Calculate orders, units sold and total order value
-- =========================================================

WITH vendor_sales AS (
    SELECT
        v.id AS vendor_id,
        v.name AS vendor_name,
        COUNT(DISTINCT o.id) AS total_orders,
        SUM(oi.quantity) AS units_sold,
        SUM(oi.quantity * oi.unit_price) AS total_revenue
    FROM vendors AS v
    INNER JOIN products AS p
        ON p.vendor_id = v.id
    INNER JOIN order_items AS oi
        ON oi.product_id = p.id
    INNER JOIN orders AS o
        ON o.id = oi.order_id
    GROUP BY
        v.id,
        v.name
)
SELECT
    vendor_name,
    total_orders,
    units_sold,
    total_revenue
FROM vendor_sales
WHERE total_revenue > 5000
ORDER BY total_revenue DESC;


-- =========================================================
-- 4. SELF JOIN
-- Compare products belonging to the same vendor
-- =========================================================

SELECT
    p1.name AS product_a,
    p1.price AS price_a,
    p2.name AS product_b,
    p2.price AS price_b
FROM products AS p1
INNER JOIN products AS p2
    ON p1.vendor_id = p2.vendor_id
   AND p1.id < p2.id
WHERE p1.name LIKE 'Day32 Product %'
  AND p2.name LIKE 'Day32 Product %'
ORDER BY
    p1.price DESC,
    p2.price DESC
LIMIT 10;


-- =========================================================
-- 5. HAVING CHALLENGE
-- Find vendors whose total order value exceeds 10000
-- =========================================================

SELECT
    v.name AS vendor_name,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM vendors AS v
INNER JOIN products AS p
    ON p.vendor_id = v.id
INNER JOIN order_items AS oi
    ON oi.product_id = p.id
GROUP BY
    v.id,
    v.name
HAVING SUM(oi.quantity * oi.unit_price) > 10000
ORDER BY total_revenue DESC;