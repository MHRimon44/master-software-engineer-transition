
-- =====================================================
-- DAY 37: POSTGRESQL INDEXES & SELECTIVITY
-- Database: postgres-lab
-- =====================================================

-- PART 1: CHECK EXISTING INDEXES

SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
      'customers',
      'products',
      'orders',
      'order_items'
  )
ORDER BY tablename, indexname;


-- PART 2: COMPOSITE INDEX
-- Query: products for a vendor, sorted by price

CREATE INDEX IF NOT EXISTS idx_products_vendor_price
ON products (vendor_id, price);


-- PART 3: CUSTOMER ORDER HISTORY
-- Query: recent orders belonging to a customer

CREATE INDEX IF NOT EXISTS idx_orders_customer_created
ON orders (customer_id, created_at DESC);


-- PART 4: PARTIAL INDEX
-- Query: recently created pending orders

CREATE INDEX IF NOT EXISTS idx_orders_pending_created
ON orders (created_at DESC)
WHERE status = 'pending';


-- PART 5: EXPRESSION INDEX
-- Query: case-insensitive customer email lookup

CREATE INDEX IF NOT EXISTS idx_customers_email_lower
ON customers (LOWER(email));


-- PART 6: UPDATE PLANNER STATISTICS

ANALYZE products;
ANALYZE orders;
ANALYZE customers;


-- PART 7: QUERY EXAMPLES

-- Vendor-wise products
SELECT
    id,
    vendor_id,
    name,
    price
FROM products
WHERE vendor_id = (
    SELECT id
    FROM vendors
    WHERE email = 'day32-vendor@example.com'
)
ORDER BY price ASC;


-- Customer order history
SELECT
    id,
    customer_id,
    status,
    created_at
FROM orders
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE email = 'mehedi@example.com'
)
ORDER BY created_at DESC;


-- Pending orders
SELECT
    id,
    status,
    created_at
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC;


-- Case-insensitive email
SELECT id, name, email
FROM customers
WHERE LOWER(email) = LOWER('MEHEDI@EXAMPLE.COM');


-- PART 8: SELECTIVITY

SELECT
    COUNT(*) AS total_products,
    COUNT(*) FILTER (
        WHERE vendor_id = (
            SELECT id
            FROM vendors
            WHERE email = 'day32-vendor@example.com'
        )
    ) AS matching_products
FROM products;


-- PART 9: QUERY PLANS

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    vendor_id,
    name,
    price
FROM products
WHERE vendor_id = 1
ORDER BY price ASC;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, customer_id, created_at
FROM orders
WHERE customer_id = 1
ORDER BY created_at DESC;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, status, created_at
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, name, email
FROM customers
WHERE LOWER(email) = 'mehedi@example.com';


-- PART 10: FINAL INDEX VERIFICATION

SELECT
    tablename,
    indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;
