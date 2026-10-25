# Day 62 — AWS Shared Responsibility Model

## 1. What AWS Manages

AWS is responsible for security OF the cloud.

Examples:

- Physical data centers
- Physical servers and hardware
- Underlying networking infrastructure
- Managed infrastructure for supported AWS services

## 2. What I Manage

I am responsible for security IN the cloud.

Examples:

- IAM permissions and access policies
- Application code and vulnerabilities
- Secrets and credentials
- Database users and access permissions
- Application data protection
- Network access configuration

## 3. My Full-Stack Project

Local development:

- Next.js frontend
- NestJS API
- PostgreSQL database
- Docker Compose

Possible AWS deployment:

- Next.js -> Amazon ECS with Fargate
- NestJS -> Amazon ECS with Fargate
- PostgreSQL -> Amazon RDS

## 4. ECS / Fargate Responsibility

AWS manages:

- Physical infrastructure
- Underlying compute infrastructure
- Fargate host infrastructure

I manage:

- Container application code
- Container images and dependencies
- Task permissions
- Application configuration
- Secrets
- Network access policies

## 5. RDS Responsibility

AWS manages:

- Managed database infrastructure
- Supported database maintenance operations
- Infrastructure-level availability mechanisms

I manage:

- Database users and permissions
- Schema and migrations
- Data protection requirements
- Database network access
- Backup and recovery requirements

## 6. Security Rules

1. Never use AWS root credentials for deployment.
2. Enable MFA.
3. Apply least-privilege IAM permissions.
4. Never commit secrets to Git.
5. Avoid public database access.
6. Review AWS costs and configure budget alerts.
