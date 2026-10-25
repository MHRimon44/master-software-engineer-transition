# Day 62 — AWS Cloud Fundamentals & IAM

## 1. AWS Region vs Availability Zone

- **Region:** AWS-এর একটি geographical location, যেমন `ap-south-1` (Mumbai)।
- **Availability Zone (AZ):** একটি Region-এর মধ্যে আলাদা infrastructure location।
- একটি Region-এ একাধিক AZ থাকে।
- High Availability-এর জন্য একাধিক AZ ব্যবহার করা যায়।

## 2. Scalability, Elasticity & High Availability

- **Scalability:** প্রয়োজন অনুযায়ী application-এর capacity বাড়ানো বা কমানো।
- **Elasticity:** Demand অনুযায়ী resources automatically adjust করা।
- **High Availability:** একটি server বা AZ fail করলেও service চালু রাখার ব্যবস্থা।

## 3. IAM Fundamentals

- **IAM User:** AWS-এর একটি identity, যার নিজস্ব permissions থাকতে পারে।
- **IAM Role:** Temporary credentials দিয়ে নির্দিষ্ট permissions ব্যবহারের ব্যবস্থা।
- **IAM Policy:** JSON document যা allowed বা denied actions নির্ধারণ করে।
- **Least Privilege:** কাজের জন্য যতটুকু permission প্রয়োজন, শুধু ততটুকু দেওয়া।

## 4. Planned Full Stack Architecture

Next.js Frontend
|
v
Application Load Balancer
|
v
ECS Fargate Services
|
v
Amazon RDS PostgreSQL

Additional services:

- Amazon ECR — Docker images
- IAM Roles — Deployment permissions
- CloudWatch — Logs and monitoring
- VPC — Network isolation

## 5. Shared Responsibility

AWS manages security **of** the cloud.

We manage security **in** the cloud, including:

- Application code
- IAM permissions
- Secrets
- Database access configuration
- Data protection

See `shared-responsibility.md`.

## 6. Secure Deployment Plan

- Never deploy using AWS root credentials.
- Prefer GitHub Actions OIDC with an IAM Role.
- Use short-lived credentials.
- Restrict ECR, ECS and PassRole permissions.
- Do not commit access keys or secrets.

See `iam-deployment-plan.md`.

## 7. AWS Account Status

AWS account verification is deferred.

Completed locally:

- AWS CLI installation
- Shared Responsibility documentation
- IAM deployment planning

Pending:

- AWS account verification
- Root MFA
- Billing and budget alerts
- Live AWS deployment

No AWS resources have been provisioned for this exercise.
