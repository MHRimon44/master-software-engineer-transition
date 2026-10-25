# Day 67 — Operational Dashboard

## Objective

Create a dashboard plan for monitoring
the production Team Task application.

## 1. API Metrics

- [ ] Total request count
- [ ] Target 5xx errors
- [ ] ALB-generated 5xx errors
- [ ] Average response latency
- [ ] p95 response latency
- [ ] Healthy target count

## 2. ECS Metrics

- [ ] Running task count
- [ ] Desired task count
- [ ] CPU utilization
- [ ] Memory utilization
- [ ] Task restart/deployment events

## 3. Database Metrics

- [ ] RDS CPU utilization
- [ ] Free storage space
- [ ] Database connections
- [ ] Read/write latency

## 4. Logging

- [ ] Structured JSON logs
- [ ] Request ID correlation
- [ ] Error-code filtering
- [ ] Log retention configured
- [ ] Sensitive data excluded

## 5. Alerts

- [ ] ALB 5xx alarm
- [ ] Unhealthy targets alarm
- [ ] Notification destination
- [ ] Incident runbook
- [ ] Alarm ownership assigned

## 6. Dashboard Questions

Can we answer:

1. Is the API available?
2. Are requests failing?
3. Is latency increasing?
4. Are ECS tasks healthy?
5. Is the database under pressure?
6. Which request produced an error?
7. Did the latest deployment cause it?

## 7. Current Status

Dashboard checklist only.
No live CloudWatch dashboard created.
