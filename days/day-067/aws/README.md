# Day 67 — Secrets and Observability

## Learning Goal

Make the production system diagnosable
without exposing secrets.

## Topics

1. AWS Secrets Manager
2. SSM Parameter Store
3. Environment-specific configuration
4. Structured JSON logging
5. Request ID correlation
6. CloudWatch Logs and Metrics
7. CloudWatch Alarms
8. Operational dashboards

## Architecture

Client
|
v
ALB
|
v
NestJS ECS/Fargate
|
+--> RDS PostgreSQL
|
+--> CloudWatch Logs
|
+--> CloudWatch Metrics

Secrets Manager
|
v
ECS Secret Injection
|
v
NestJS Configuration

## Documents

- secrets-management.md
- structured-logging.md
- cloudwatch-alarms.md
- operations-dashboard.md

## Definition of Done

- [ ] No production secrets in Git
- [ ] Logs support request correlation
- [ ] At least one actionable alarm defined
- [ ] Dashboard checklist completed
- [ ] Local practical tests pass
- [ ] DSA completed
- [ ] Git commit pushed

## AWS Status

Local planning only.
No AWS resources have been deployed.
