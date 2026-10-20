-- Day 34: PostgreSQL Constraint Tests
-- All data changes will be rolled back.

BEGIN;

-- Test 1: Invalid Foreign Key
DO $$
BEGIN
    BEGIN
        INSERT INTO customer_profiles (customer_id, phone)
        VALUES (999999, '01700000000');

        RAISE EXCEPTION 'TEST 1 FAILED: Invalid FK accepted';
    EXCEPTION
        WHEN foreign_key_violation THEN
            RAISE NOTICE 'TEST 1 PASSED: Invalid FK rejected';
    END;
END;
$$;

-- Test 2: Duplicate Profile
DO $$
DECLARE
    existing_customer_id BIGINT;
BEGIN
    SELECT id INTO existing_customer_id
    FROM customers
    WHERE email = 'mehedi@example.com';

    IF existing_customer_id IS NULL THEN
        RAISE EXCEPTION 'TEST 2 FAILED: Customer not found';
    END IF;

    BEGIN
        INSERT INTO customer_profiles (customer_id, phone)
        VALUES (existing_customer_id, '01800000000');

        RAISE EXCEPTION 'TEST 2 FAILED: Duplicate accepted';
    EXCEPTION
        WHEN unique_violation THEN
            RAISE NOTICE 'TEST 2 PASSED: Duplicate profile rejected';
    END;
END;
$$;

-- Test 3: ON DELETE CASCADE
DO $$
DECLARE
    test_customer_id BIGINT;
    remaining_profiles INTEGER;
BEGIN
    INSERT INTO customers (name, email)
    VALUES ('Day34 Cascade Test', 'day34-cascade-test@example.com')
    RETURNING id INTO test_customer_id;

    INSERT INTO customer_profiles (customer_id, phone)
    VALUES (test_customer_id, '01900000000');

    DELETE FROM customers
    WHERE id = test_customer_id;

    SELECT COUNT(*) INTO remaining_profiles
    FROM customer_profiles
    WHERE customer_id = test_customer_id;

    IF remaining_profiles = 0 THEN
        RAISE NOTICE 'TEST 3 PASSED: Cascade deleted profile';
    ELSE
        RAISE EXCEPTION 'TEST 3 FAILED: Profile still exists';
    END IF;
END;
$$;

ROLLBACK;

SELECT COUNT(*) AS total_customers FROM customers;
SELECT COUNT(*) AS total_profiles FROM customer_profiles;