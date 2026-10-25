# Day 63 — AWS VPC Network Design

## Project

Full Stack Application:

- Frontend: Next.js
- Backend: NestJS
- Database: PostgreSQL
- Container Platform: Amazon ECS Fargate
- Database Service: Amazon RDS

## 1. VPC Configuration

VPC CIDR: 10.0.0.0/16

This VPC provides an isolated network for our application.

## 2. Subnet Planning

| Subnet        | CIDR         | Type    | Availability Zone |
| ------------- | ------------ | ------- | ----------------- |
| Public A      | 10.0.1.0/24  | Public  | AZ A              |
| Public B      | 10.0.2.0/24  | Public  | AZ B              |
| Private App A | 10.0.11.0/24 | Private | AZ A              |
| Private App B | 10.0.12.0/24 | Private | AZ B              |
| Private DB A  | 10.0.21.0/24 | Private | AZ A              |
| Private DB B  | 10.0.22.0/24 | Private | AZ B              |

AZ A and AZ B represent two distinct Availability Zones
within the same AWS Region.

## 3. Public Subnets

Public subnets contain the internet-facing
Application Load Balancer.

Requirements:

- Route to Internet Gateway
- Appropriate public routing
- Load Balancer security group

## 4. Private Application Subnets

Private application subnets contain ECS Fargate
services running our NestJS API.

Requirements:

- No direct inbound access from the internet
- Accept application traffic from the Load Balancer
- Use VPC endpoints or controlled outbound access
  when AWS services or external APIs are required

## 5. Private Database Subnets

Private database subnets contain Amazon RDS PostgreSQL.

Requirements:

- Database must not be publicly accessible
- Allow PostgreSQL traffic only from the API security group
- Use an RDS DB subnet group across at least two AZs
- Enable encryption and backups

## 6. Routing

Public subnet route table:

- VPC CIDR -> local
- 0.0.0.0/0 -> Internet Gateway

Private application route table:

- VPC CIDR -> local
- Optional outbound route through NAT Gateway
- Or use suitable VPC endpoints

Private database route table:

- VPC CIDR -> local
- No default internet route in this design

Note: NAT Gateway and other AWS networking
resources may incur charges.

## 7. Request Flow

User
|
v
DNS
|
v
Public Application Load Balancer
|
v
NestJS API on ECS Fargate
|
v
Amazon RDS PostgreSQL

## 8. Security Principles

- Use least-privilege security group rules.
- Keep application containers in private subnets.
- Keep databases in private subnets.
- Do not expose PostgreSQL port 5432 publicly.
- Use HTTPS for public traffic.
- Do not store credentials in source code.

## 9. Current Status

Architecture design only.

No AWS networking resources have been created.
AWS account setup remains deferred.
