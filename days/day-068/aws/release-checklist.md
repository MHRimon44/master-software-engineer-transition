# Day 68 — Release Verification Checklist

## Before Release

- [ ] CI passed on the release commit
- [ ] Docker image built successfully
- [ ] Image tagged with commit SHA
- [ ] Production deployment approved
- [ ] Secrets configured securely
- [ ] Database migration reviewed
- [ ] Rollback revision identified

## After Release

- [ ] ECS service stable
- [ ] ALB targets healthy
- [ ] HTTPS certificate valid
- [ ] GET /health returns 200
- [ ] Critical API smoke tests pass
- [ ] CloudWatch logs visible
- [ ] No unexpected 5xx spike
- [ ] Database connectivity verified
- [ ] Release tag recorded

## Example Smoke Test

curl -fsS https://api.example.com/health

The example domain must be replaced with
the actual deployed API domain.

## Release Tag

Example:

git tag -a day-068-aws-milestone -m \
"Day 68 AWS deployment milestone"

git push origin day-068-aws-milestone

Only create a deployment-complete release tag
after actual deployment verification.

For documentation-only work, use a
clearly named planning checkpoint instead.

## Current Status

Live deployment verification is pending.
AWS account is not yet configured.
