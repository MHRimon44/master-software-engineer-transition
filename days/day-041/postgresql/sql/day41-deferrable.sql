
-- =====================================================
-- DAY 41: DEFERRABLE FK EXAMPLE
-- Temporary tables only
-- =====================================================

BEGIN;

CREATE TEMP TABLE day41_parent (
    id INTEGER PRIMARY KEY
);

CREATE TEMP TABLE day41_child (
    id INTEGER PRIMARY KEY,
    parent_id INTEGER NOT NULL,

    CONSTRAINT fk_day41_parent
        FOREIGN KEY (parent_id)
        REFERENCES day41_parent(id)
        DEFERRABLE INITIALLY DEFERRED
);

-- Child is inserted before parent.
-- This works because the FK is deferred.

INSERT INTO day41_child (
    id,
    parent_id
)
VALUES (1, 100);

INSERT INTO day41_parent (id)
VALUES (100);

-- Force the constraint to be checked now.

SET CONSTRAINTS fk_day41_parent IMMEDIATE;

SELECT
    c.id AS child_id,
    p.id AS parent_id
FROM day41_child c
JOIN day41_parent p
    ON p.id = c.parent_id;

ROLLBACK;
