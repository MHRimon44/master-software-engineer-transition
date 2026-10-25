# Day 66 — TLS and ALB Health Checks

## 1. HTTPS Plan

Public API:
https://api.example.com

Public web:
https://www.example.com

Static assets:
https://assets.example.com

All public application traffic should use HTTPS.

## 2. ACM Certificates

- Request or import a valid TLS certificate.
- Validate domain ownership.
- Associate the certificate with the ALB listener.
- Use appropriate TLS security policies.
- Plan certificate renewal and monitoring.

For CloudFront, ACM certificates for custom
domains must be in us-east-1.

For ALB, the certificate must be available
in the ALB's AWS Region.

## 3. ALB Listener Configuration

Listener 80:
Redirect HTTP to HTTPS 443.

Listener 443:
Terminate TLS and forward requests
to the API target group.

## 4. Target Group

Target type:
IP (for ECS/Fargate with awsvpc networking).

Application port:
3000

Protocol:
HTTP inside the VPC for this planned design.

For end-to-end encryption requirements,
configure HTTPS to application targets too.

## 5. Health Check

Path:
GET /health

Expected status:
200

Example response:

{
"status": "ok"
}

Recommended initial settings:

- Protocol: HTTP
- Port: Traffic port
- Path: /health
- Success code: 200

Thresholds and intervals must be tuned
for the application and deployment needs.

## 6. Expected ALB Behavior

Healthy task:
Eligible to receive requests.

Unhealthy task:
Normally removed from normal routing
when other healthy targets are available.

Important:
If every registered target is unhealthy,
ALB can fail open and route to unhealthy targets.

An ALB health check does not replace
application monitoring or ECS recovery.

## 7. Security

- ALB accepts public HTTPS.
- API SG allows traffic from ALB SG.
- Database SG allows traffic from API SG.
- Do not expose port 3000 publicly.
- Do not expose port 5432 publicly.

## 8. Status

Documentation only.
No AWS load balancer deployed.
