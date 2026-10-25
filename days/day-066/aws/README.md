# Day 66 — Route 53, TLS, ALB and CloudFront

## Learning Objectives

Understand secure public traffic routing
for a full-stack AWS application.

## Topics

1. Amazon Route 53 DNS
2. AWS Certificate Manager and TLS
3. Application Load Balancer
4. ALB target groups and health checks
5. Amazon CloudFront
6. CDN caching and private S3 origins

## API Architecture

Browser
|
v
Route 53 DNS
|
v
HTTPS Application Load Balancer
|
v
NestJS on ECS/Fargate
|
v
Private RDS PostgreSQL

## Static Assets Architecture

Browser
|
v
Route 53 DNS
|
v
CloudFront
|
v
Private S3 Bucket

## Architecture Documents

- traffic-architecture.md
- tls-alb-health-checks.md
- cloudfront-caching.md

## Key Security Decisions

- HTTPS for public application traffic
- ACM-managed TLS certificates
- ALB health checks on /health
- API deployed in private subnets
- Database deployed in private subnets
- S3 bucket private by default
- CloudFront OAC for private S3 access

## Important Distinction

DNS resolves domain names.
ALB routes application requests.
CloudFront provides edge caching and delivery.

They are different services.

## AWS Status

AWS account setup remains deferred.

All work is local planning.
No AWS resources have been deployed.
