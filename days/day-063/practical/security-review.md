# Day 63 — Security Rules Review

## Approved Inbound Rules

| Resource | Port | Source    |
| -------- | ---- | --------- |
| ALB      | 443  | 0.0.0.0/0 |
| API      | 3000 | alb-sg    |
| RDS      | 5432 | api-sg    |

## Rejected Rules

- RDS 5432 from 0.0.0.0/0
- API 3000 from 0.0.0.0/0
- SSH 22 from 0.0.0.0/0

## Review Questions

1. Why is the ALB public?
   - It receives HTTPS requests from users.

2. Why is the API private?
   - Only the ALB should reach its inbound port.

3. Why is RDS private?
   - Database access should be restricted
     to authorized application resources.

4. Does a private subnet automatically
   block every outbound connection?
   - No. Routing, security groups, NACLs,
     and available gateways/endpoints matter.

5. Does a Security Group have deny rules?
   - No. Security Groups support allow rules.
