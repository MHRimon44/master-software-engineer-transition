
-- =====================================================
-- DAY 38: EXPLAIN ANALYZE & QUERY OPTIMIZATION
-- Database: postgres-lab
-- =====================================================

-- PART 1: DATABASE STATISTICS

SELECT
    relname AS table_name,
    n_live_tup AS estimated_live_rows
FROM pg_stat_user_tables
WHERE relname IN (
    'customers',
    'vendors',
    'products',
    'orders',
    'order_items'
)
ORDER BY relname;


-- PART 2: UPDATE PLANNER STATISTICS

ANALYZE customers;
ANALYZE vendors;
ANALYZE products;
ANALYZE orders;
ANALYZE order_items;


-- PART 3: SEQUENTIAL VS INDEX SCAN

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    vendor_id,
    name,
    price
FROM products
WHERE vendor_id = 1
ORDER BY price;


-- PART 4: CUSTOMER ORDER HISTORY

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    customer_id,
    status,
    created_at
FROM orders
WHERE customer_id = 1
ORDER BY created_at DESC;


-- PART 5: JOIN QUERY

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    o.id AS order_id,
    c.name AS customer_name,
    o.status,
    o.created_at
FROM orders o
JOIN customers c
    ON c.id = o.customer_id
ORDER BY o.created_at DESC;


-- PART 6: AGGREGATION QUERY

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    p.id AS product_id,
    p.name,
    COALESCE(
        SUM(oi.quantity),
        0
    ) AS total_units_sold
FROM products p
LEFT JOIN order_items oi
    ON oi.product_id = p.id
GROUP BY p.id, p.name
ORDER BY total_units_sold DESC;


-- PART 7: PENDING ORDERS

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    status,
    created_at
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC;


-- PART 8: INDEX INVENTORY

SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
      'products',
      'orders',
      'order_items'
  )
ORDER BY tablename, indexname;


-- PART 9: FINAL SUMMARY

SELECT
    (SELECT COUNT(*) FROM products)
        AS product_count,
    (SELECT COUNT(*) FROM orders)
        AS order_count,
    (SELECT COUNT(*) FROM order_items)
        AS order_item_count;
