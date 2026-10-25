# Day 64 — ECS/Fargate Deployment Plan

## Objective

Deploy a Dockerized NestJS API using
Amazon ECS with AWS Fargate.

This is a deployment outline, not a live deployment.

## 1. Source Repository

GitHub repository contains:

- NestJS application source
- Dockerfile
- Application configuration
- Tests
- CI/CD workflow

Never commit production secrets.

## 2. Container Image

1. Run automated tests.
2. Build production Docker image.
3. Tag image using Git commit SHA.
4. Authenticate to Amazon ECR.
5. Push image to private ECR repository.

Example image reference:

ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/nestjs-api:COMMIT_SHA

Values above are placeholders.

## 3. ECS Cluster

Create an ECS cluster for the application.

Compute strategy:
AWS Fargate.

No customer-managed EC2 instances required.

## 4. ECS Task Definition

Configure:

- Fargate compatibility
- CPU and memory
- Container image from ECR
- Container port 3000
- CloudWatch log configuration
- Task execution role
- Application task role if needed
- Environment configuration
- Secrets from an appropriate secrets service

Task execution role:
Allows ECS to perform infrastructure actions
such as pulling ECR images and writing logs.

Task role:
Grants permissions needed by application code.

These roles have different responsibilities.

## 5. ECS Service

Create an ECS service using:

- The task definition
- Fargate launch type/capacity configuration
- Private application subnets
- Application security group
- Desired task count
- Deployment health settings
- ALB target group integration

For a highly available design, distribute
tasks across multiple Availability Zones.

## 6. Networking

Based on Day 63:

VPC: 10.0.0.0/16

ALB:

- Public subnets
- HTTPS port 443

NestJS:

- Private application subnets
- Container port 3000
- Inbound allowed only from ALB security group

RDS:

- Private database subnets
- PostgreSQL port 5432
- Inbound allowed only from API security group

Private tasks require suitable outbound access
for ECR, logging, secrets and other dependencies,
using VPC endpoints or controlled NAT routing.

## 7. Deployment Pipeline

GitHub Actions
|
v
Run tests
|
v
Build Docker image
|
v
Push image to Amazon ECR
|
v
Register updated ECS task definition
|
v
Update ECS service
|
v
Wait for deployment stability
|
v
Verify API health endpoint

Authentication:
Prefer GitHub Actions OIDC with an IAM role.

Never use AWS root access keys.

## 8. Health Checks

API endpoint:
GET /health

Expected successful response:
HTTP 200

Configure:

- Container health checks where appropriate
- ALB target group health checks
- CloudWatch logs
- Failure monitoring

## 9. Cost and Security

Before any live deployment:

- Verify AWS account and billing status
- Set up MFA and billing alerts
- Estimate Fargate task cost
- Estimate ALB and networking cost
- Estimate RDS and storage cost
- Define a resource cleanup plan

No AWS resources should be created
during this account-free exercise.

## 10. Current Status

Deployment planning completed locally.

Live ECS deployment: Deferred.
