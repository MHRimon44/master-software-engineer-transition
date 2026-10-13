-- Day 32: Marketplace sample data
-- Safe to rerun: avoids duplicate Day 32 records.

BEGIN;

-- 1. Ensure a dedicated Day 32 vendor exists.

INSERT INTO vendors (name, email)
VALUES ('Day32 Marketplace Vendor', 'day32-vendor@example.com')
ON CONFLICT (email) DO NOTHING;


-- 2. Ensure a dedicated Day 32 customer exists.

INSERT INTO customers (name, email)
VALUES ('Day32 Test Customer', 'day32-customer@example.com')
ON CONFLICT (email) DO NOTHING;


-- 3. Insert 30 products.

INSERT INTO products (
    vendor_id,
    name,
    price,
    stock_quantity
)
SELECT
    v.id,
    'Day32 Product ' || LPAD(n::text, 2, '0'),
    (500 + n * 125)::numeric(12, 2),
    10 + n
FROM generate_series(1, 30) AS n
CROSS JOIN vendors AS v
WHERE v.email = 'day32-vendor@example.com'
  AND NOT EXISTS (
      SELECT 1
      FROM products AS p
      WHERE p.vendor_id = v.id
        AND p.name = 'Day32 Product ' || LPAD(n::text, 2, '0')
  );


-- 4. Insert 20 orders.

-- Day 31 schema does not have an order reference column.
-- We identify the Day 32 orders through their dedicated customer.
-- The condition below fills the count up to 20.

INSERT INTO orders (
    customer_id,
    status
)
SELECT
    c.id,
    CASE
        WHEN n % 4 = 0 THEN 'completed'
        WHEN n % 4 = 1 THEN 'pending'
        WHEN n % 4 = 2 THEN 'confirmed'
        ELSE 'cancelled'
    END
FROM customers AS c
CROSS JOIN LATERAL generate_series(
    1,
    GREATEST(
        0,
        20 - (
            SELECT COUNT(*)::integer
            FROM orders AS existing
            WHERE existing.customer_id = c.id
        )
    )
) AS n
WHERE c.email = 'day32-customer@example.com';


-- 5. Verify total records.

SELECT 'customers' AS table_name, COUNT(*) AS total
FROM customers
UNION ALL
SELECT 'vendors', COUNT(*)
FROM vendors
UNION ALL
SELECT 'products', COUNT(*)
FROM products
UNION ALL
SELECT 'orders', COUNT(*)
FROM orders
UNION ALL
SELECT 'order_items', COUNT(*)
FROM order_items;


-- 6. Verify dedicated Day 32 records.

SELECT COUNT(*) AS day32_products
FROM products AS p
JOIN vendors AS v ON v.id = p.vendor_id
WHERE v.email = 'day32-vendor@example.com'
  AND p.name LIKE 'Day32 Product %';

SELECT COUNT(*) AS day32_orders
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
WHERE c.email = 'day32-customer@example.com';

COMMIT;