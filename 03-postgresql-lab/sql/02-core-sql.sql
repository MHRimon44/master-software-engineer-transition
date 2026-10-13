-- DAY 32: CORE SQL CRUD AND EXPRESSIONS
-- Database: postgres-lab
-- 12 SQL exercises

-- ==========================================
-- 01. SELECT: Read products
-- ==========================================

SELECT id, name, price, stock_quantity
FROM products
ORDER BY id
LIMIT 10;


-- ==========================================
-- 02. WHERE: Filter by price
-- ==========================================

SELECT id, name, price
FROM products
WHERE price >= 1500
ORDER BY price ASC;


-- ==========================================
-- 03. AND: Multiple conditions
-- ==========================================

SELECT id, name, price, stock_quantity
FROM products
WHERE price BETWEEN 1000 AND 3000
  AND stock_quantity >= 15
ORDER BY price DESC;


-- ==========================================
-- 04. LIKE: Search products
-- ==========================================

SELECT id, name, price
FROM products
WHERE name ILIKE '%product 1%'
ORDER BY name;


-- ==========================================
-- 05. LIMIT and OFFSET: Pagination
-- ==========================================

SELECT id, name, price
FROM products
ORDER BY id
LIMIT 5 OFFSET 5;


-- ==========================================
-- 06. Aliases: Rename output columns
-- ==========================================

SELECT
    name AS product_name,
    price AS original_price,
    ROUND(price * 1.10, 2) AS price_with_10_percent
FROM products
WHERE name LIKE 'Day32 Product %'
ORDER BY id
LIMIT 5;


-- ==========================================
-- 07. CASE: Derived order label
-- ==========================================

SELECT
    id,
    status,
    CASE
        WHEN status = 'pending' THEN 'Waiting for approval'
        WHEN status = 'confirmed' THEN 'Order confirmed'
        WHEN status = 'completed' THEN 'Successfully delivered'
        WHEN status = 'cancelled' THEN 'Order cancelled'
        ELSE 'Unknown status'
    END AS status_label
FROM orders
ORDER BY id DESC
LIMIT 10;


-- ==========================================
-- 08. COALESCE: Handle NULL
-- ==========================================

SELECT
    id,
    name,
    COALESCE(
        NULLIF(name, ''),
        'Unnamed Product'
    ) AS display_name,
    stock_quantity
FROM products
ORDER BY id
LIMIT 10;


-- ==========================================
-- 09. INSERT with RETURNING
-- ==========================================

INSERT INTO products (
    vendor_id,
    name,
    price,
    stock_quantity
)
SELECT
    v.id,
    'Day32 CRUD Test Product',
    1999.00,
    10
FROM vendors AS v
WHERE v.email = 'day32-vendor@example.com'
  AND NOT EXISTS (
      SELECT 1
      FROM products AS p
      WHERE p.vendor_id = v.id
        AND p.name = 'Day32 CRUD Test Product'
  )
RETURNING id, name, price, stock_quantity;


-- ==========================================
-- 10. UPDATE with WHERE and RETURNING
-- ==========================================

UPDATE products
SET
    price = 1799.00,
    stock_quantity = 25
WHERE name = 'Day32 CRUD Test Product'
  AND vendor_id = (
      SELECT id
      FROM vendors
      WHERE email = 'day32-vendor@example.com'
  )
RETURNING id, name, price, stock_quantity;


-- ==========================================
-- 11. DELETE with WHERE and RETURNING
-- ==========================================

DELETE FROM products
WHERE name = 'Day32 CRUD Test Product'
  AND vendor_id = (
      SELECT id
      FROM vendors
      WHERE email = 'day32-vendor@example.com'
  )
RETURNING id, name;


-- ==========================================
-- 12. Aggregate summary
-- ==========================================

SELECT
    COUNT(*) AS total_products,
    MIN(price) AS cheapest_price,
    MAX(price) AS highest_price,
    ROUND(AVG(price), 2) AS average_price
FROM products
WHERE name LIKE 'Day32 Product %';