
-- =====================================================
-- DAY 38: CONTROLLED QUERY BENCHMARK
-- Temporary data only
-- =====================================================

BEGIN;

CREATE TEMP TABLE day38_products (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    vendor_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL
) ON COMMIT DROP;

INSERT INTO day38_products (
    vendor_id,
    name,
    price
)
SELECT
    (g % 1000) + 1,
    'Product ' || g,
    ((g % 10000) + 100)::NUMERIC(12, 2)
FROM generate_series(1, 50000) AS g;

ANALYZE day38_products;

-- TEST A: BEFORE INDEX

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    vendor_id,
    name,
    price
FROM day38_products
WHERE vendor_id = 500
ORDER BY price;

-- CREATE INDEX

CREATE INDEX idx_day38_vendor_price
ON day38_products (vendor_id, price);

ANALYZE day38_products;

-- TEST B: AFTER INDEX

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    vendor_id,
    name,
    price
FROM day38_products
WHERE vendor_id = 500
ORDER BY price;

-- VERIFY MATCHING ROWS

SELECT COUNT(*) AS matching_rows
FROM day38_products
WHERE vendor_id = 500;

ROLLBACK;
