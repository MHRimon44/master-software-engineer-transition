# Day 38 — Query Benchmark Results

## Environment

- Database: postgres-lab
- PostgreSQL: 17
- Benchmark rows: 50,000
- Matching rows: 50

## Before Index

- Scan type:
- Planning time:
- Execution time:
- Shared/local buffer activity:
- Sort operation:

## After Index

- Scan type:
- Planning time:
- Execution time:
- Shared/local buffer activity:
- Sort operation:

## Conclusion

1. Did PostgreSQL choose an index?
2. Was sorting avoided?
3. Did execution time improve?
4. Why might the planner choose Seq Scan?
5. What are the costs of maintaining the index?
