# Day 67 — Structured Logging Design

## Objective

Make NestJS API requests searchable,
correlatable and diagnosable.

## 1. Log Format

Use one JSON object per log event.

Required fields:

- timestamp
- level
- service
- environment
- requestId
- method
- route
- statusCode
- durationMs
- errorCode (when applicable)

## 2. Example Success Log

{
"timestamp": "2026-10-25T10:00:00.000Z",
"level": "info",
"service": "team-task-api",
"environment": "production",
"requestId": "req-example-001",
"method": "GET",
"route": "/tasks",
"statusCode": 200,
"durationMs": 32
}

## 3. Example Error Log

{
"timestamp": "2026-10-25T10:01:00.000Z",
"level": "error",
"service": "team-task-api",
"environment": "production",
"requestId": "req-example-002",
"method": "POST",
"route": "/tasks",
"statusCode": 500,
"durationMs": 185,
"errorCode": "TASK_CREATE_FAILED"
}

## 4. Request Correlation

1. Accept a valid trusted request ID
   or generate a new UUID.
2. Attach the ID to request context.
3. Include the ID in API logs.
4. Return it in the response header.
5. Propagate it to downstream services.
6. Search logs using the same ID.

Do not blindly trust arbitrary request
headers as authoritative tracing metadata.

## 5. Privacy Rules

Never log:

- Passwords
- Access tokens
- Refresh tokens
- Authorization headers
- Full payment details
- Database connection strings
- Sensitive request bodies

Use safe route templates rather than
full URLs containing sensitive query values.

## 6. Health Endpoints

GET /health/live

Checks whether the application process
is responsive.

GET /health/ready

Checks whether the application is ready
to serve traffic.

ALB target health checks should use
a reliable endpoint with a documented
failure policy.

## 7. CloudWatch Integration

ECS can send container stdout/stderr
logs to CloudWatch Logs using awslogs.

Log group example:

/ecs/team-task-api

Configure log retention and access control.

## 8. Current Status

Logging architecture documented.
No live CloudWatch log group created.
