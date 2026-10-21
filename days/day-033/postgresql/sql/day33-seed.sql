-- DAY 33: Seed order items for JOIN practice
-- Existing records are preserved.
-- Re-running this file will not duplicate order-product pairs.

BEGIN;

WITH numbered_orders AS (
    SELECT
        o.id AS order_id,
        ROW_NUMBER() OVER (ORDER BY o.id) AS order_number
    FROM orders AS o
    JOIN customers AS c
        ON c.id = o.customer_id
    WHERE c.email = 'day32-customer@example.com'
),
numbered_products AS (
    SELECT
        p.id AS product_id,
        p.price,
        ROW_NUMBER() OVER (ORDER BY p.name) AS product_number
    FROM products AS p
    JOIN vendors AS v
        ON v.id = p.vendor_id
    WHERE v.email = 'day32-vendor@example.com'
      AND p.name LIKE 'Day32 Product %'
),
product_count AS (
    SELECT COUNT(*) AS total
    FROM numbered_products
),
items_to_insert AS (
    SELECT
        o.order_id,
        p.product_id,
        CASE
            WHEN slot.slot_number = 1 THEN 1
            ELSE 2
        END AS quantity,
        p.price AS unit_price
    FROM numbered_orders AS o
    CROSS JOIN generate_series(1, 2) AS slot(slot_number)
    CROSS JOIN product_count AS pc
    JOIN numbered_products AS p
        ON p.product_number = (
            (
                (o.order_number - 1) * 2
                + slot.slot_number - 1
            ) % pc.total
        ) + 1
    WHERE pc.total >= 2
)
INSERT INTO order_items (
    order_id,
    product_id,
    quantity,
    unit_price
)
SELECT
    order_id,
    product_id,
    quantity,
    unit_price
FROM items_to_insert
ON CONFLICT (order_id, product_id) DO NOTHING;

-- Verify total order items

SELECT COUNT(*) AS total_order_items
FROM order_items;

-- Verify Day 32 customer order items

SELECT COUNT(*) AS day32_order_items
FROM order_items AS oi
JOIN orders AS o
    ON o.id = oi.order_id
JOIN customers AS c
    ON c.id = o.customer_id
WHERE c.email = 'day32-customer@example.com';

COMMIT;