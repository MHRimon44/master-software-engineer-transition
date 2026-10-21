
-- =====================================================
-- DAY 36: ROW LOCKING & SAFE INVENTORY
-- Database: postgres-lab
-- =====================================================

-- 1. Dedicated test product
-- Existing production-like products will not be modified.

INSERT INTO products (
    vendor_id,
    name,
    price,
    stock_quantity
)
SELECT
    v.id,
    'Day36 Locking Test Product',
    1000.00,
    1
FROM vendors v
WHERE v.email = 'day32-vendor@example.com'
  AND NOT EXISTS (
      SELECT 1
      FROM products
      WHERE name = 'Day36 Locking Test Product'
  );

-- 2. Check stock

SELECT
    id,
    name,
    stock_quantity
FROM products
WHERE name = 'Day36 Locking Test Product';

-- 3. Reset stock for repeatable tests

UPDATE products
SET stock_quantity = 1
WHERE name = 'Day36 Locking Test Product';

-- 4. Safe atomic inventory decrement

BEGIN;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE name = 'Day36 Locking Test Product'
  AND stock_quantity >= 1
RETURNING id, name, stock_quantity;

COMMIT;

-- 5. Attempt second purchase

BEGIN;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE name = 'Day36 Locking Test Product'
  AND stock_quantity >= 1
RETURNING id, name, stock_quantity;

COMMIT;

-- 6. Final verification

SELECT
    name,
    stock_quantity
FROM products
WHERE name = 'Day36 Locking Test Product';
