# Day 63 — AWS Networking Fundamentals

## Learning Objectives

- Understand VPC and CIDR
- Design public and private subnets
- Understand route tables and gateways
- Configure conceptual Security Group rules
- Understand DNS and Route 53
- Plan secure full-stack networking

## VPC Design

VPC CIDR: 10.0.0.0/16

We use two Availability Zones for higher availability.

| Subnet   | CIDR         | Purpose     |
| -------- | ------------ | ----------- |
| Public A | 10.0.1.0/24  | Public ALB  |
| Public B | 10.0.2.0/24  | Public ALB  |
| App A    | 10.0.11.0/24 | Private ECS |
| App B    | 10.0.12.0/24 | Private ECS |
| DB A     | 10.0.21.0/24 | Private RDS |
| DB B     | 10.0.22.0/24 | Private RDS |

## Networking Components

### Internet Gateway

Provides internet routing for public subnets.

### NAT Gateway

Allows private resources to initiate outbound
internet connections when configured.

NAT Gateway may incur charges.

### Route Table

Defines where network traffic is directed.

## Security Groups

| Resource   | Inbound Port | Source             |
| ---------- | ------------ | ------------------ |
| ALB        | 443          | Internet           |
| NestJS API | 3000         | ALB Security Group |
| PostgreSQL | 5432         | API Security Group |

Security Groups are stateful.

## DNS and Route 53

Example:

app.example.com
|
v
Route 53
|
v
Application Load Balancer
|
v
NestJS API
|
v
PostgreSQL

Route 53 Alias records can target an ALB.

AWS Certificate Manager can provide
certificates for HTTPS.

## Architecture Documents

- vpc-network-design.md
- security-groups.md
- dns-routing.md

## Security Principles

- Do not expose PostgreSQL publicly.
- Keep application services in private subnets.
- Allow only required inbound traffic.
- Use HTTPS for public endpoints.
- Use least-privilege IAM permissions.
- Keep credentials outside source code.

## AWS Account Status

AWS account setup remains deferred.

No AWS resources have been created.

This is a conceptual architecture exercise.
