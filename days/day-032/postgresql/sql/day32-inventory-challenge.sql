-- Day 32: Inventory Reporting Challenge

SELECT
    id,
    name AS product_name,
    price,
    stock_quantity,

    CASE
        WHEN stock_quantity = 0
            THEN 'Out of Stock'
        WHEN stock_quantity < 15
            THEN 'Low Stock'
        ELSE 'In Stock'
    END AS stock_status,

    price * stock_quantity AS inventory_value

FROM products

WHERE name LIKE 'Day32 Product %'
  AND stock_quantity >= 15

ORDER BY inventory_value ASC, id ASC

LIMIT 5 OFFSET 5;