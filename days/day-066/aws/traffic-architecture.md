# Day 66 — Secure Traffic Architecture

## Goal

Design secure public traffic routing for our
Next.js + NestJS + PostgreSQL application.

## 1. API Request Flow

1. Client requests https://api.example.com.
2. DNS resolves the domain to the ALB.
3. Client establishes an HTTPS connection to ALB.
4. ALB uses an ACM-managed TLS certificate.
5. ALB checks target group health.
6. ALB forwards traffic to a healthy NestJS task.
7. NestJS accesses private RDS PostgreSQL.
8. Response returns to the client.

## 2. Public Components

Route 53:

- Hosts the DNS record.
- Alias record targets the ALB.

Application Load Balancer:

- Lives in public subnets.
- Accepts HTTPS on port 443.
- Routes to healthy ECS tasks.

AWS Certificate Manager:

- Manages the certificate used by the ALB.

## 3. Private Components

NestJS:

- ECS/Fargate in private application subnets.
- Receives traffic on port 3000 from ALB.

PostgreSQL:

- RDS in private database subnets.
- Receives traffic on port 5432 from API.

## 4. Static Assets Flow

1. Client requests https://assets.example.com.
2. DNS resolves the name to CloudFront.
3. Client establishes HTTPS with CloudFront.
4. CloudFront serves cached content if available.
5. Otherwise, CloudFront retrieves it from S3.

## 5. Planned DNS Records

api.example.com:
Route 53 Alias A/AAAA -> ALB

assets.example.com:
Route 53 Alias A/AAAA -> CloudFront

These are example domains, not real records.

## 6. Security Boundaries

- Public HTTPS: 443
- API inbound: 3000 from ALB SG only
- DB inbound: 5432 from API SG only
- No public PostgreSQL access
- S3 bucket private by default
- CloudFront uses Origin Access Control
- No production credentials in source code

## 7. Current Status

Local architecture exercise only.

No domain, hosted zone, certificate,
ALB or CloudFront distribution created.
