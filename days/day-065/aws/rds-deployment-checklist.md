# Day 65 — RDS PostgreSQL Deployment Checklist

## Objective

Plan a secure PostgreSQL database deployment
using Amazon RDS.

## 1. Networking

- [ ] Use the existing VPC: 10.0.0.0/16
- [ ] Create an RDS DB subnet group
- [ ] Include private DB subnets in two AZs
- [ ] Set Publicly Accessible = No
- [ ] Use PostgreSQL port 5432
- [ ] Allow inbound only from api-sg
- [ ] Do not allow 0.0.0.0/0 to reach port 5432

Planned DB subnets:

- 10.0.21.0/24
- 10.0.22.0/24

## 2. Database Configuration

- [ ] Select supported PostgreSQL version
- [ ] Select appropriate DB instance class
- [ ] Estimate storage requirements
- [ ] Enable storage encryption
- [ ] Configure database name
- [ ] Configure maintenance window

## 3. Credentials and Access

- [ ] Use a strong database password
- [ ] Store secrets in AWS Secrets Manager
      or another appropriate secret store
- [ ] Never commit database passwords to Git
- [ ] Use separate application DB credentials
- [ ] Apply least-privilege database permissions
- [ ] Require TLS for database connections

## 4. Backup and Recovery

- [ ] Configure automated backup retention
- [ ] Understand point-in-time recovery
- [ ] Consider Multi-AZ for high availability
- [ ] Define recovery objectives
- [ ] Test database restore before production

Multi-AZ improves availability.
It does not replace independent backup planning.

## 5. Monitoring

- [ ] Enable useful CloudWatch metrics
- [ ] Monitor CPU and free storage
- [ ] Monitor DB connections
- [ ] Monitor query performance
- [ ] Configure alerts for critical conditions

## 6. Cost and Deletion

- [ ] Estimate instance cost
- [ ] Estimate storage and backup cost
- [ ] Consider Multi-AZ additional cost
- [ ] Enable deletion protection for production
- [ ] Define cleanup procedure for test resources

## 7. Current Status

This is a local planning exercise.

No RDS instance has been created.
AWS account verification remains deferred.
