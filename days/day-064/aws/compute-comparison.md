# Day 64 — AWS Compute Comparison

## Application Context

Application: NestJS REST API
Runtime: Node.js
Containerized: Yes
Database: PostgreSQL
Deployment Goal: Secure and maintainable portfolio application

## 1. Amazon EC2

EC2 provides virtual machines in AWS.

We manage:

- Operating system configuration
- OS security patching
- Node.js and Docker installation
- Application deployment
- Instance capacity and scaling
- Instance monitoring and hardening

Advantages:

- Full server control
- Flexible runtime configuration
- Can be economical for steady workloads

Disadvantages:

- More infrastructure maintenance
- Requires OS patching
- Requires capacity and availability planning

## 2. Amazon ECS with AWS Fargate

ECS orchestrates containers.
Fargate provides managed compute for those containers.

We manage:

- Docker images
- ECS task definitions
- ECS services
- CPU and memory allocations
- Application configuration and secrets
- IAM roles and security groups
- Health checks, logging and scaling

AWS manages the underlying compute infrastructure.

Advantages:

- No EC2 host management
- Fits our Docker-based NestJS application
- Integrates with ECR, ALB and CloudWatch
- Supports managed service deployments

Disadvantages:

- Requires ECS networking and IAM knowledge
- Provisioned task resources incur charges
- Networking and load balancers add cost
- Less host-level control than EC2

## 3. AWS Lambda

Lambda runs functions in response to events.

We manage:

- Function code
- Runtime dependencies
- IAM execution role
- Memory and timeout configuration
- Application-level security
- Event integrations and monitoring

Advantages:

- Suitable for event-driven workloads
- No server provisioning
- Scales with events

Disadvantages:

- Maximum execution duration
- Cold starts may affect latency
- Not a direct replacement for every server
- Long-running processes need another approach

## 4. Comparison

| Criterion            | EC2            | ECS/Fargate              | Lambda                     |
| -------------------- | -------------- | ------------------------ | -------------------------- |
| OS management        | Customer       | AWS underlying host      | AWS underlying host        |
| Docker workflow      | Manual setup   | Native                   | Container image option     |
| Long-running API     | Suitable       | Suitable                 | Requires adaptation        |
| Operational overhead | Higher         | Moderate                 | Lower for simple functions |
| Scaling              | Configure      | ECS Service Auto Scaling | Event-driven               |
| Cost                 | Instance-based | Task resource-based      | Request/duration-based     |

## 5. Our Decision

Preferred portfolio deployment target:
Amazon ECS with AWS Fargate.

Reasons:

1. The NestJS API is already containerized.
2. We want to practice managed container deployment.
3. We want to avoid maintaining EC2 hosts.
4. ECS integrates with ECR, ALB and IAM.

Tradeoffs:

- ECS/Fargate is not necessarily the cheapest.
- ALB, networking, logs and data services add cost.
- A small EC2 instance may be cheaper for
  a consistently running low-traffic workload.

## 6. Deployment Status

Architecture decision only.

AWS account setup remains deferred.
No EC2, ECS, Fargate or Lambda resources deployed.
