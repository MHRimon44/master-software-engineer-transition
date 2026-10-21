
-- =====================================================
-- DAY 42: POSTGRESQL CHECKPOINT VERIFICATION
-- =====================================================

-- 1. Database identity

SELECT
    current_database() AS database_name,
    current_user AS current_role,
    version() AS postgres_version;


-- 2. Application role

SELECT
    rolname,
    rolsuper,
    rolcreatedb,
    rolcreaterole,
    rolcanlogin
FROM pg_roles
WHERE rolname = 'marketplace_app_day42';


-- 3. Application privileges

SELECT
    has_table_privilege(
        'marketplace_app_day42',
        'products',
        'SELECT'
    ) AS can_read_products,

    has_table_privilege(
        'marketplace_app_day42',
        'audit_log',
        'INSERT'
    ) AS can_insert_audit,

    has_table_privilege(
        'marketplace_app_day42',
        'audit_log',
        'UPDATE'
    ) AS can_update_audit,

    has_table_privilege(
        'marketplace_app_day42',
        'audit_log',
        'DELETE'
    ) AS can_delete_audit;


-- 4. Existing marketplace counts

SELECT
    (SELECT COUNT(*) FROM customers)
        AS customers,

    (SELECT COUNT(*) FROM vendors)
        AS vendors,

    (SELECT COUNT(*) FROM products)
        AS products,

    (SELECT COUNT(*) FROM orders)
        AS orders,

    (SELECT COUNT(*) FROM order_items)
        AS order_items;


-- 5. Verify keyset index

SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'products'
  AND indexname = 'idx_products_created_id_desc';


-- 6. Active connections

SELECT
    datname,
    COUNT(*) AS connections
FROM pg_stat_activity
WHERE datname IS NOT NULL
GROUP BY datname
ORDER BY datname;
