# Day 63 — AWS Security Groups

## 1. What is a Security Group?

A Security Group is a stateful virtual firewall
that controls inbound and outbound traffic
for supported AWS resources.

Security Groups use allow rules.
They do not support explicit deny rules.

## 2. Our Application Architecture

Internet
|
| HTTPS 443
v
Application Load Balancer (alb-sg)
|
| HTTP 3000
v
NestJS API on ECS Fargate (api-sg)
|
| PostgreSQL 5432
v
Amazon RDS PostgreSQL (db-sg)

## 3. ALB Security Group

Name: alb-sg

Inbound:

- TCP 443 from 0.0.0.0/0
- TCP 443 from ::/0 only if IPv6 is enabled

Outbound:

- TCP 3000 to api-sg

Purpose:
Allow public HTTPS traffic and forward
requests to the application.

TLS termination is planned at the ALB.

## 4. API Security Group

Name: api-sg

Inbound:

- TCP 3000 from alb-sg

Outbound:

- TCP 5432 to db-sg
- Additional outbound access only when required
  for AWS services or external dependencies

Purpose:
The API must not accept direct public traffic.

## 5. Database Security Group

Name: db-sg

Inbound:

- TCP 5432 from api-sg

Outbound:

- Restrict unnecessary initiated outbound access
  according to application requirements

Purpose:
Only the application can connect to PostgreSQL.

Never allow:

- TCP 5432 from 0.0.0.0/0
- TCP 5432 from ::/0

## 6. Why Use Security Group References?

Instead of allowing traffic from fixed server IPs,
we reference another Security Group.

Example:

API inbound:
TCP 3000 from alb-sg

This works even when application IPs change,
provided the networking configuration supports
the security group reference.

## 7. Stateful Behavior

Security Groups are stateful.

When an inbound connection is allowed,
the response traffic is automatically allowed.

The same principle applies to allowed outbound
connections and their response traffic.

## 8. Security Checklist

- [x] Public access limited to ALB HTTPS
- [x] API inbound restricted to ALB
- [x] Database inbound restricted to API
- [x] No public PostgreSQL access
- [x] Security Group design documented
- [ ] Rules deployed and verified in AWS

## 9. Current Status

Documentation and planning only.

No AWS Security Groups have been created.
