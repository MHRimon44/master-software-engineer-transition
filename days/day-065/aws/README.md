# Day 65 — AWS RDS PostgreSQL and S3

## Learning Goal

Plan managed relational database and object
storage services with secure access patterns.

## Topics

1. Amazon RDS PostgreSQL
2. Automated backups and recovery
3. Multi-AZ high availability
4. Private database networking
5. PostgreSQL migration planning
6. Amazon S3 object storage

## Architecture

Client
|
v
Application Load Balancer
|
v
NestJS on ECS/Fargate
|
+----> RDS PostgreSQL
|
+----> Amazon S3

## Documentation

- rds-deployment-checklist.md
- postgres-migration-plan.md
- s3-storage-design.md

## Security Decisions

- RDS remains private
- Database inbound traffic restricted to API
- No database credentials in Git
- Database backups and recovery are planned
- S3 objects are private by default
- Application uses IAM-controlled S3 access

## AWS Status

All work is local planning.

No AWS resources have been deployed.
