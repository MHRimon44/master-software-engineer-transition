# Day 64 — AWS Lambda Use Case

## Use Case: Image Upload Event Handler

Our full-stack application allows users
to upload images.

A future Lambda function could process
an image after it is uploaded to Amazon S3.

## Proposed Event Flow

1. User uploads an image.
2. The application stores the image in S3.
3. S3 emits an object-created event.
4. Lambda receives the event.
5. Lambda validates and processes the image.
6. The function stores processed output
   or updates application metadata.

## Why Lambda Fits

- Event-driven workload
- No permanently running worker required
- Processing can scale with upload events
- Independent from the main NestJS API

## Important Considerations

- Lambda has execution time limits.
- Retries can cause duplicate processing.
- The handler should be idempotent.
- IAM access should be least-privilege.
- Large or long-running jobs may need
  a different compute strategy.
- S3 event configuration must avoid
  recursive processing loops.

## Decision

NestJS API: ECS/Fargate
Image event handler: Potential Lambda function

## Status

Conceptual example only.

No Lambda function or S3 bucket deployed.
