-- Day 32: Seed data

BEGIN;

INSERT INTO vendors (name, email)
VALUES ('Day32 Marketplace Vendor', 'day32-vendor@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (name, email)
VALUES ('Day32 Test Customer', 'day32-customer@example.com')
ON CONFLICT (email) DO NOTHING;

-- Insert 30 products

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

-- Insert 20 orders

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

-- Verify products

SELECT COUNT(*) AS day32_products
FROM products
WHERE name LIKE 'Day32 Product %';

-- Verify orders

SELECT COUNT(*) AS day32_orders
FROM orders
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE email = 'day32-customer@example.com'
);

COMMIT;