-- =========================================================
-- DAY 35: POSTGRESQL TRANSACTIONS & ACID
-- Database: postgres-lab
-- =========================================================

-- PART 1: PAYMENT TABLE

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE
        REFERENCES orders(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'paid', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- PART 2: SUCCESSFUL TRANSACTION
-- Create order + item + payment atomically
-- =========================================================

BEGIN;

DO $$
DECLARE
    v_customer_id BIGINT;
    v_product_id BIGINT;
    v_price NUMERIC(12, 2);
    v_order_id BIGINT;
BEGIN
    SELECT id INTO STRICT v_customer_id
    FROM customers
    WHERE email = 'mehedi@example.com';

    SELECT id, price
    INTO STRICT v_product_id, v_price
    FROM products
    WHERE name = 'Mechanical Keyboard';

    INSERT INTO orders (customer_id, status)
    VALUES (v_customer_id, 'pending')
    RETURNING id INTO v_order_id;

    INSERT INTO order_items (
        order_id, product_id, quantity, unit_price
    )
    VALUES (
        v_order_id, v_product_id, 1, v_price
    );

    INSERT INTO payments (
        order_id, amount, status
    )
    VALUES (
        v_order_id, v_price, 'pending'
    );

    RAISE NOTICE
        'SUCCESS: Order %, item and payment created',
        v_order_id;
END;
$$;

COMMIT;


-- =========================================================
-- PART 3: FORCED FAILURE & ROLLBACK
-- Test data must not remain
-- =========================================================

BEGIN;

DO $$
DECLARE
    v_customer_id BIGINT;
    v_order_id BIGINT;
BEGIN
    SELECT id INTO STRICT v_customer_id
    FROM customers
    WHERE email = 'mehedi@example.com';

    INSERT INTO orders (customer_id, status)
    VALUES (v_customer_id, 'pending')
    RETURNING id INTO v_order_id;

    RAISE NOTICE
        'Temporary order created: %', v_order_id;

    -- Intentionally force an error.
    -- This error is NOT caught, so the transaction fails.
    RAISE EXCEPTION
        'Intentional failure: testing rollback';
END;
$$;

-- Recover the failed transaction.
ROLLBACK;

-- Verify no orphan order/payment relationships.
SELECT COUNT(*) AS orders_without_customer
FROM orders o
LEFT JOIN customers c ON c.id = o.customer_id
WHERE c.id IS NULL;


-- =========================================================
-- PART 4: INVENTORY RESERVATION TEST
-- Reserve stock safely and undo the demonstration
-- =========================================================

BEGIN;

DO $$
DECLARE
    v_product_id BIGINT;
    v_remaining_stock INTEGER;
BEGIN
    SELECT id INTO STRICT v_product_id
    FROM products
    WHERE name = 'Mechanical Keyboard';

    UPDATE products
    SET stock_quantity = stock_quantity - 1
    WHERE id = v_product_id
      AND stock_quantity >= 1
    RETURNING stock_quantity INTO v_remaining_stock;

    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Insufficient stock for product %',
            v_product_id;
    END IF;

    RAISE NOTICE
        'INVENTORY TEST PASSED: Remaining stock = %',
        v_remaining_stock;
END;
$$;

-- Undo inventory test.
ROLLBACK;


-- =========================================================
-- PART 5: FINAL VERIFICATION
-- =========================================================

SELECT
    o.id AS order_id,
    o.status AS order_status,
    p.amount AS payment_amount,
    p.status AS payment_status
FROM orders o
JOIN payments p ON p.order_id = o.id
ORDER BY o.id DESC
LIMIT 5;

SELECT
    id,
    name,
    stock_quantity
FROM products
WHERE name = 'Mechanical Keyboard';