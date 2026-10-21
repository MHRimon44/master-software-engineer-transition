
-- =====================================================
-- DAY 40: FINAL DATABASE VERIFICATION
-- =====================================================

-- 1. Verify required columns.

SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN (
      'metadata',
      'tags',
      'description',
      'search_text'
  )
ORDER BY column_name;


-- 2. Verify product relationships are intact.

SELECT
    COUNT(*) AS total_products,
    COUNT(*) FILTER (
        WHERE vendor_id IS NOT NULL
    ) AS products_with_vendor
FROM products;


-- 3. Verify metadata type.

SELECT
    COUNT(*) AS valid_metadata_rows
FROM products
WHERE jsonb_typeof(metadata) = 'object';


-- 4. Verify array values.

SELECT
    COUNT(*) AS tagged_products
FROM products
WHERE cardinality(tags) > 0;


-- 5. Verify search.

SELECT
    COUNT(*) AS matching_products
FROM products
WHERE search_text @@
    plainto_tsquery(
        'english',
        'keyboard'
    );


-- 6. Inspect Day 40 indexes.

SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'products'
  AND indexname LIKE 'idx_products_%gin'
ORDER BY indexname;
