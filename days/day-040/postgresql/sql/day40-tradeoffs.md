# Day 40 — PostgreSQL Feature Tradeoffs

## JSONB

Good for:

- Optional product attributes
- Flexible product specifications
- External integration metadata

Avoid for:

- Prices
- Inventory
- Foreign keys
- Payment status
- Frequently joined relational entities

Why:
Core business invariants need strong constraints
and clear relational relationships.

## Arrays

Good for:

- Simple tags
- Small lists of optional labels
- Basic membership queries

Avoid when:

- Tags need foreign keys
- Tags have descriptions or permissions
- Many-to-many relationships require metadata

Alternative:
tags + product_tags junction tables.

## GIN Indexes

Useful for:

- JSONB containment queries
- Array containment/overlap
- Full-text search

Tradeoffs:

- Extra disk usage
- Slower writes
- Index maintenance overhead
- Not every query benefits from GIN

## Full-Text Search

Good for:

- Searchable product names
- Product descriptions
- Relevance-based results

Limitations:

- Language configuration matters
- Typo tolerance is limited
- Autocomplete needs additional design
- Search ranking requires tuning

## Final Architecture Decision

Keep:

- product.price relational
- product.stock_quantity relational
- product.vendor_id as foreign key

Use:

- metadata JSONB for optional attributes
- tags TEXT[] for simple labels
- search_text TSVECTOR for product search

Never replace core relational design with JSONB.
