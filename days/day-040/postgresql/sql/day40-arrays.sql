
-- =====================================================
-- DAY 40: POSTGRESQL ARRAYS
-- Database: postgres-lab
-- =====================================================

-- 1. Add optional tags.

ALTER TABLE products
ADD COLUMN IF NOT EXISTS tags TEXT[]
NOT NULL DEFAULT ARRAY[]::TEXT[];


-- 2. Assign tags to sample products.

UPDATE products
SET tags = ARRAY[
    'electronics',
    'keyboard',
    'gaming'
]::TEXT[]
WHERE name = 'Mechanical Keyboard';

UPDATE products
SET tags = ARRAY[
    'electronics',
    'mouse',
    'wireless'
]::TEXT[]
WHERE name = 'Wireless Mouse';


-- 3. View product tags.

SELECT
    id,
    name,
    tags
FROM products
WHERE cardinality(tags) > 0
ORDER BY id;


-- 4. Find products containing a tag.
-- @> means array contains all specified elements.

SELECT
    name,
    tags
FROM products
WHERE tags @> ARRAY['gaming']::TEXT[];


-- 5. Find products with overlapping tags.
-- && means at least one element overlaps.

SELECT
    name,
    tags
FROM products
WHERE tags && ARRAY[
    'gaming',
    'wireless'
]::TEXT[];


-- 6. Count tags.

SELECT
    name,
    cardinality(tags) AS tag_count
FROM products
WHERE cardinality(tags) > 0
ORDER BY name;


-- 7. Expand arrays into rows.

SELECT
    p.name,
    tag.value AS tag
FROM products p
CROSS JOIN LATERAL
    unnest(p.tags) AS tag(value)
ORDER BY p.name, tag.value;


-- 8. GIN index for array searches.

CREATE INDEX IF NOT EXISTS
    idx_products_tags_gin
ON products
USING GIN (tags);


-- 9. Query plan.

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    name
FROM products
WHERE tags @> ARRAY['gaming']::TEXT[];
