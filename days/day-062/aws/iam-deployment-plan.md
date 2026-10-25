# Day 62 — Least-Privilege IAM Deployment Plan

## Goal

Deploy the Next.js + NestJS application to AWS without using root credentials.

## Human Access

- Use an MFA-protected identity.
- Prefer temporary credentials.
- Do not use root for everyday development.
- Do not create unnecessary long-lived access keys.

## CI/CD Deployment Identity

Proposed identity:
GitHub Actions OIDC -> AWS IAM Role

Role name (planned):
day62-fullstack-deploy-role

## Trust Policy Requirements

- Trust only the intended GitHub repository.
- Restrict access to an approved branch or environment.
- Use temporary credentials through OIDC.
- Do not store AWS access keys in GitHub secrets.

## Planned Permissions

Only after identifying exact AWS resources:

- Push approved container images to specific ECR repositories.
- Register approved ECS task definitions.
- Update specific ECS services.
- Pass only approved ECS task roles.

Do not grant:

- AdministratorAccess
- Wildcard access to all AWS resources without justification
- IAM user/role management unless explicitly required

## Security Checklist

- [ ] Root account MFA enabled
- [ ] Human access uses MFA
- [ ] No root access keys used
- [ ] AWS budget alerts configured
- [ ] Deployment role trust policy reviewed
- [ ] Permissions scoped to required resources

## Current Status

Planning only. No AWS resources have been deployed.
