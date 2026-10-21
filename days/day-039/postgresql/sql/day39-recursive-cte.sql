
-- =====================================================
-- DAY 39: RECURSIVE CTE
-- Isolated example, no persistent schema changes.
-- =====================================================

WITH RECURSIVE employees (
    id,
    employee_name,
    manager_id
) AS (
    VALUES
        (1, 'CEO', NULL::INTEGER),
        (2, 'Tech Lead', 1),
        (3, 'HR Lead', 1),
        (4, 'Backend Developer', 2),
        (5, 'Mobile Developer', 2),
        (6, 'Recruiter', 3)
),

employee_tree AS (
    -- Anchor query
    SELECT
        id,
        employee_name,
        manager_id,
        1 AS depth,
        ARRAY[id] AS path

    FROM employees

    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive query
    SELECT
        e.id,
        e.employee_name,
        e.manager_id,
        et.depth + 1,
        et.path || e.id

    FROM employees e

    JOIN employee_tree et
        ON e.manager_id = et.id

    WHERE NOT e.id = ANY(et.path)
)

SELECT
    id,
    employee_name,
    manager_id,
    depth,
    path

FROM employee_tree

ORDER BY path;
