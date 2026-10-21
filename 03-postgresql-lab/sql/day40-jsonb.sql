
-- =====================================================
-- DAY 40: JSONB PRODUCT METADATA
-- Database: postgres-lab
-- =====================================================

-- 1. Add optional product metadata.
-- Existing product columns remain unchanged.

ALTER TABLE products
ADD COLUMN IF NOT EXISTS metadata JSONB
NOT NULL DEFAULT '{}'::jsonb;


-- 2. Update known sample products only.
-- Other products are not modified.

UPDATE products
SET metadata = jsonb_build_object(
    'color', 'black',
    'switch_type', 'blue',
    'backlit', true,
    'warranty_months', 12
)
WHERE name = 'Mechanical Keyboard';

UPDATE products
SET metadata = jsonb_build_object(
    'color', 'white',
    'connectivity', 'bluetooth',
    'battery_type', 'AA'
)
WHERE name = 'Wireless Mouse';


-- 3. View product metadata.

SELECT
    id,
    name,
    price,
    stock_quantity,
    metadata
FROM products
WHERE name IN (
    'Mechanical Keyboard',
    'Wireless Mouse'
)
ORDER BY id;


-- 4. Extract JSONB string value.
-- -> returns JSONB.
-- ->> returns TEXT.

SELECT
    name,
    metadata ->> 'color' AS color
FROM products
WHERE metadata ? 'color'
ORDER BY name;


-- 5. JSONB containment query.

SELECT
    id,
    name,
    metadata
FROM products
WHERE metadata @> '{"color":"black"}'::jsonb;


-- 6. Query JSONB boolean.

SELECT
    id,
    name
FROM products
WHERE metadata @> '{"backlit":true}'::jsonb;


-- 7. Query JSONB numeric attribute.

SELECT
    name,
    (metadata ->> 'warranty_months')::INTEGER
        AS warranty_months
FROM products
WHERE jsonb_typeof(
    metadata -> 'warranty_months'
) = 'number';


-- 8. Add GIN index for flexible metadata queries.

CREATE INDEX IF NOT EXISTS
    idx_products_metadata_gin
ON products
USING GIN (metadata);


-- 9. Inspect query plan.

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    name
FROM products
WHERE metadata @> '{"color":"black"}'::jsonb;


-- 10. Compare with normalized relational filtering.

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    name
FROM products
WHERE price >= 1000
  AND stock_quantity > 0;


-- 11. Confirm the column exists.

SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name = 'metadata';
