# Day 68 — CI/CD and AWS Deployment Milestone

## Learning Goal

Automate API testing, Docker builds
and AWS deployment preparation.

## Main Topics

1. GitHub Actions CI
2. Docker image build
3. Amazon ECR
4. ECS/Fargate deployment
5. GitHub OIDC authentication
6. Deployment rollback
7. AWS Budgets
8. Resource cleanup

## Files

- deployment-plan.md
- budget-and-cleanup.md
- release-checklist.md

GitHub workflows:

- .github/workflows/day-068-ci.yml
- .github/workflows/day-068-deploy.yml

## Verification

Local:

- YAML configuration reviewed
- API directory confirmed
- CI workflow tested
- Docker build verified

AWS (deferred):

- ECR push
- ECS deployment
- HTTPS smoke test
- CloudWatch logs
- Budget alert

## Important

Do not claim a successful production
deployment until it has actually happened.

## Status

CI/CD planning and local verification.
AWS deployment pending account setup.
