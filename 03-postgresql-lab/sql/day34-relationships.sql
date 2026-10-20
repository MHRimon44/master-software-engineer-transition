-- =====================================================
-- DAY 34: PostgreSQL Relationship Design
-- Topics:
-- 1. One-to-One
-- 2. One-to-Many
-- 3. Many-to-Many
-- 4. Foreign Key
-- 5. UNIQUE Constraint
-- 6. ON DELETE CASCADE
-- =====================================================


-- =====================================================
-- PART 1: ONE-TO-ONE RELATIONSHIP
-- customers <-> customer_profiles
-- =====================================================

CREATE TABLE IF NOT EXISTS customer_profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    customer_id BIGINT NOT NULL UNIQUE,

    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_customer_profiles_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);


-- Insert profile for existing customer

INSERT INTO customer_profiles (
    customer_id,
    phone,
    address,
    city
)
SELECT
    id,
    '01700000000',
    'Dhanmondi',
    'Dhaka'
FROM customers
WHERE email = 'mehedi@example.com'
ON CONFLICT (customer_id) DO NOTHING;


-- Verify One-to-One relationship

SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    cp.phone,
    cp.address,
    cp.city
FROM customers AS c
LEFT JOIN customer_profiles AS cp
    ON cp.customer_id = c.id
ORDER BY c.id;


-- =====================================================
-- PART 2: ONE-TO-MANY RELATIONSHIP
-- customers -> orders
-- =====================================================

SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    COUNT(o.id) AS total_orders
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.id
GROUP BY
    c.id,
    c.name
ORDER BY total_orders DESC;


-- =====================================================
-- PART 3: MANY-TO-MANY RELATIONSHIP
-- orders <-> products via order_items
-- =====================================================

SELECT
    o.id AS order_id,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM orders AS o
INNER JOIN order_items AS oi
    ON oi.order_id = o.id
INNER JOIN products AS p
    ON p.id = oi.product_id
ORDER BY
    o.id,
    p.name
LIMIT 15;


-- =====================================================
-- PART 4: VERIFY CONSTRAINTS
-- =====================================================

SELECT
    tc.constraint_name,
    tc.table_name,
    tc.constraint_type
FROM information_schema.table_constraints AS tc
WHERE tc.table_schema = 'public'
  AND tc.table_name = 'customer_profiles'
ORDER BY tc.constraint_type;


-- =====================================================
-- PART 5: CUSTOMER PROFILE SUMMARY
-- =====================================================

SELECT
    COUNT(*) AS total_profiles
FROM customer_profiles;