# Day 68 — AWS Budget and Cleanup Plan

## Objective

Avoid unexpected cloud spending.

## 1. Monthly Budget

Example initial learning budget:
USD 10 per month.

This is a spending target, not a guarantee
that the proposed architecture fits within it.

Set AWS Budget notifications at:

- 50% of monthly budget
- 80% of monthly budget
- 100% of monthly budget

Configure billing email notifications.

Budgets and alerts do not automatically
stop all AWS charges.

## 2. Cost Sources

- ECS/Fargate compute
- Application Load Balancer
- NAT Gateway
- Amazon RDS
- RDS storage and backups
- ECR image storage
- S3 storage and requests
- CloudFront data transfer
- CloudWatch logs and metrics
- Secrets Manager

## 3. Cost Reduction Strategy

For learning:

- Avoid leaving test resources running.
- Avoid unnecessary NAT Gateways.
- Delete unused ALBs.
- Delete unused ECS services.
- Review RDS running costs.
- Remove obsolete ECR images.
- Set log retention.
- Review storage and snapshot charges.

## 4. Cleanup Checklist

- [ ] ECS services removed
- [ ] ECS tasks stopped
- [ ] ALBs removed
- [ ] Target groups reviewed
- [ ] NAT Gateways removed
- [ ] Unused Elastic IPs released
- [ ] RDS instances reviewed/deleted
- [ ] RDS snapshots reviewed
- [ ] ECR images reviewed
- [ ] S3 buckets and objects reviewed
- [ ] CloudWatch log retention checked
- [ ] Secrets Manager resources reviewed

Some resources may incur charges even when
application traffic is zero.

## 5. Current Status

Budget and cleanup plan only.

No AWS budget or resources created.
