-- ============================================
-- Day 31: Relational Constraints Lab
-- Valid data
-- ============================================

INSERT INTO customers (name, email)
VALUES ('Mehedi Hasan', 'mehedi@example.com');

INSERT INTO vendors (name, email)
VALUES ('Tech Vendor BD', 'vendor@example.com');

INSERT INTO products (
    vendor_id,
    name,
    price,
    stock_quantity
)
VALUES (
    1,
    'Mechanical Keyboard',
    4500.00,
    20
);

INSERT INTO orders (
    customer_id,
    status
)
VALUES (
    1,
    'pending'
);

INSERT INTO order_items (
    order_id,
    product_id,
    quantity,
    unit_price
)
VALUES (
    1,
    1,
    2,
    4500.00
);