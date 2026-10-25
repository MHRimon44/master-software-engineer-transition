# Day 68 — AWS Deployment Plan

## Objective

Create a repeatable CI/CD pipeline for
the Team Task NestJS application.

## Selected Architecture

GitHub
|
v
GitHub Actions CI
|
v
Docker Image
|
v
Amazon ECR
|
v
ECS/Fargate
|
v
Application Load Balancer
|
v
HTTPS API

Database:
Private RDS PostgreSQL

Storage:
Private S3 + CloudFront

Monitoring:
CloudWatch Logs, Metrics and Alarms

## CI Stages

1. Checkout code
2. Install dependencies
3. Lint
4. Test
5. Build application
6. Build Docker image

CI must pass before release approval.

## CD Stages

1. Authorize deployment
2. Authenticate with AWS using OIDC
3. Build Docker image
4. Tag image with Git commit SHA
5. Push image to ECR
6. Register new ECS task definition
7. Update ECS service
8. Wait for service stability
9. Verify HTTPS and health
10. Inspect CloudWatch logs

## Deployment Strategy

- Use immutable commit SHA image tags.
- Keep previous task definitions.
- Deploy through an approved workflow.
- Monitor health and error rates.
- Use ECS deployment circuit breaker
  where appropriate.

## Rollback Plan

1. Identify the last healthy task definition.
2. Update ECS service to that revision.
3. Wait for service stability.
4. Verify /health and application behavior.
5. Check CloudWatch logs and metrics.
6. Document the incident.

Database schema changes must be planned
for backward compatibility.

Reverting an application image does not
automatically revert database migrations.

## Security

- GitHub OIDC instead of static AWS keys
- Least-privilege IAM
- Production secrets outside Git
- Private ECS and RDS subnets
- Public HTTPS through ALB
- Protected production environment

## Current Status

CI/CD design only.

AWS deployment has not been executed.
