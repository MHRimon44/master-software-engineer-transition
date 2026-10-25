# Day 64 — AWS Compute Strategy

## Session Goal

Choose AWS compute based on operational needs,
application architecture and tradeoffs.

## Topics

1. Amazon EC2
2. Amazon ECS with AWS Fargate
3. AWS Lambda
4. Managed vs self-managed infrastructure
5. Container deployment planning

## Project Context

Our application:

- Next.js frontend
- NestJS backend
- PostgreSQL database
- Docker-based development workflow

## Compute Decision

Preferred target:
Amazon ECS with AWS Fargate.

Why:

- Existing Docker workflow
- Managed underlying compute
- Suitable for long-running NestJS API
- Integration with ECR, ALB and CloudWatch

Alternative:
Amazon EC2 for more control or potentially
lower cost with steady, small workloads.

Potential supporting workload:
AWS Lambda for image upload event processing.

## Documentation

- compute-comparison.md
- ecs-deployment-plan.md
- lambda-use-case.md

## Responsibility Summary

EC2:
We manage the guest operating system,
its patching and application deployment.

ECS/Fargate:
AWS manages the underlying compute.
We manage images, tasks, services, permissions,
networking and application security.

Lambda:
AWS manages the execution infrastructure.
We manage function code, dependencies,
permissions, configuration and events.

## Security Checklist

- [x] No root access keys planned
- [x] GitHub Actions OIDC preferred
- [x] Private API networking planned
- [x] Database access restricted in design
- [x] Application secrets kept outside Git
- [ ] Live AWS deployment completed

## Current Status

AWS account verification is deferred.

All exercises are local documentation
and conceptual deployment planning.

No billable AWS resources were created
for this session.
