
-- =====================================================
-- DAY 39: WINDOW FUNCTIONS & ANALYTICAL SQL
-- Database: postgres-lab
-- =====================================================

-- PART 1: CHECK EXISTING DATA

SELECT COUNT(*) AS total_orders
FROM orders;

SELECT COUNT(*) AS total_order_items
FROM order_items;

SELECT COUNT(*) AS total_products
FROM products;


-- PART 2: MONTHLY REVENUE
-- For this exercise, completed orders count as revenue.
-- Uses order item prices, not current product prices.

WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC(
            'month',
            o.created_at
        )::DATE AS month,

        SUM(
            oi.quantity * oi.unit_price
        ) AS revenue

    FROM orders o

    JOIN order_items oi
        ON oi.order_id = o.id

    WHERE o.status = 'completed'

    GROUP BY 1
)

SELECT
    month,
    revenue,

    SUM(revenue) OVER (
        ORDER BY month
        ROWS BETWEEN UNBOUNDED PRECEDING
        AND CURRENT ROW
    ) AS running_revenue

FROM monthly_revenue

ORDER BY month;


-- PART 3: MONTHLY REVENUE BY YEAR
-- Running total resets every year.

WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC(
            'month',
            o.created_at
        )::DATE AS month,

        SUM(
            oi.quantity * oi.unit_price
        ) AS revenue

    FROM orders o

    JOIN order_items oi
        ON oi.order_id = o.id

    WHERE o.status = 'completed'

    GROUP BY 1
)

SELECT
    EXTRACT(YEAR FROM month)::INTEGER
        AS revenue_year,

    month,
    revenue,

    SUM(revenue) OVER (
        PARTITION BY EXTRACT(YEAR FROM month)
        ORDER BY month
        ROWS BETWEEN UNBOUNDED PRECEDING
        AND CURRENT ROW
    ) AS yearly_running_revenue

FROM monthly_revenue

ORDER BY month;


-- PART 4: TOP PRODUCTS PER VENDOR
-- Includes products with zero sales.

WITH product_sales AS (
    SELECT
        v.id AS vendor_id,
        v.name AS vendor_name,

        p.id AS product_id,
        p.name AS product_name,

        COALESCE(
            SUM(oi.quantity),
            0
        ) AS units_sold,

        COALESCE(
            SUM(
                oi.quantity * oi.unit_price
            ),
            0
        ) AS sales_amount

    FROM vendors v

    JOIN products p
        ON p.vendor_id = v.id

    LEFT JOIN order_items oi
        ON oi.product_id = p.id

    GROUP BY
        v.id,
        v.name,
        p.id,
        p.name
),

ranked_products AS (
    SELECT
        *,

        ROW_NUMBER() OVER (
            PARTITION BY vendor_id
            ORDER BY
                units_sold DESC,
                product_id ASC
        ) AS product_rank

    FROM product_sales
)

SELECT
    vendor_name,
    product_name,
    units_sold,
    sales_amount,
    product_rank

FROM ranked_products

WHERE product_rank <= 3

ORDER BY
    vendor_name,
    product_rank;


-- PART 5: RANK VS DENSE_RANK VS ROW_NUMBER

WITH scores AS (
    SELECT *
    FROM (
        VALUES
            ('Keyboard', 100),
            ('Mouse', 80),
            ('Monitor', 80),
            ('Headphone', 60)
    ) AS t(product_name, score)
)

SELECT
    product_name,
    score,

    ROW_NUMBER() OVER (
        ORDER BY score DESC, product_name
    ) AS row_number,

    RANK() OVER (
        ORDER BY score DESC
    ) AS rank_value,

    DENSE_RANK() OVER (
        ORDER BY score DESC
    ) AS dense_rank_value

FROM scores

ORDER BY score DESC, product_name;


-- PART 6: FINAL VERIFICATION

SELECT
    COUNT(*) AS customers_count
FROM customers;

SELECT
    COUNT(*) AS orders_count
FROM orders;
