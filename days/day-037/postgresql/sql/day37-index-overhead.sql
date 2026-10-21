
-- DAY 37: INDEX WRITE OVERHEAD
-- Changes are rolled back after testing.

BEGIN;

CREATE TEMP TABLE day37_index_test (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    vendor_id INTEGER,
    price NUMERIC(12, 2)
) ON COMMIT DROP;

-- TEST A: INSERT WITHOUT INDEX

EXPLAIN (ANALYZE, BUFFERS)
INSERT INTO day37_index_test (vendor_id, price)
SELECT
    (g % 20) + 1,
    (g % 5000) + 100
FROM generate_series(1, 10000) AS g;

TRUNCATE day37_index_test;

-- ADD INDEX

CREATE INDEX idx_day37_temp_vendor_price
ON day37_index_test (vendor_id, price);

-- TEST B: INSERT WITH INDEX

EXPLAIN (ANALYZE, BUFFERS)
INSERT INTO day37_index_test (vendor_id, price)
SELECT
    (g % 20) + 1,
    (g % 5000) + 100
FROM generate_series(1, 10000) AS g;

-- UPDATE TEST

EXPLAIN (ANALYZE, BUFFERS)
UPDATE day37_index_test
SET price = price + 10
WHERE vendor_id = 5;

ROLLBACK;
