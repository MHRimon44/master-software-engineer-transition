
-- =====================================================
-- DAY 40: FULL-TEXT SEARCH
-- Database: postgres-lab
-- =====================================================

-- 1. Add optional product description.

ALTER TABLE products
ADD COLUMN IF NOT EXISTS description TEXT
NOT NULL DEFAULT '';


-- 2. Add sample descriptions.

UPDATE products
SET description =
    'Mechanical gaming keyboard with blue switches'
WHERE name = 'Mechanical Keyboard';

UPDATE products
SET description =
    'Wireless Bluetooth mouse for office and laptop'
WHERE name = 'Wireless Mouse';


-- 3. Create a generated search vector.
-- For this exercise, assume search_text does not
-- already exist in the products table.

ALTER TABLE products
ADD COLUMN IF NOT EXISTS search_text TSVECTOR
GENERATED ALWAYS AS (
    to_tsvector(
        'english'::regconfig,
        coalesce(name, '') || ' ' ||
        coalesce(description, '')
    )
) STORED;


-- 4. Create GIN index.

CREATE INDEX IF NOT EXISTS
    idx_products_search_text_gin
ON products
USING GIN (search_text);


-- 5. Inspect searchable tokens.

SELECT
    name,
    search_text
FROM products
WHERE name IN (
    'Mechanical Keyboard',
    'Wireless Mouse'
);


-- 6. Search for gaming keyboard.

SELECT
    id,
    name,
    description
FROM products
WHERE search_text @@
    plainto_tsquery(
        'english',
        'gaming keyboard'
    );


-- 7. Search for wireless mouse.

SELECT
    id,
    name,
    description
FROM products
WHERE search_text @@
    plainto_tsquery(
        'english',
        'wireless mouse'
    );


-- 8. Ranked full-text search.

SELECT
    id,
    name,

    ts_rank(
        search_text,
        plainto_tsquery(
            'english',
            'gaming keyboard'
        )
    ) AS relevance

FROM products

WHERE search_text @@
    plainto_tsquery(
        'english',
        'gaming keyboard'
    )

ORDER BY relevance DESC, id ASC;


-- 9. Inspect query plan.

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    name
FROM products
WHERE search_text @@
    plainto_tsquery(
        'english',
        'gaming keyboard'
    );
