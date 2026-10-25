# Day 67 — AWS Secrets Management Plan

## Objective

Keep production credentials outside Git
and securely inject configuration into
the NestJS application.

## 1. Environment Separation

Development:

- Local environment variables
- .env excluded from Git
- Local PostgreSQL

Staging:

- Separate database
- Separate credentials
- Separate AWS resources where appropriate

Production:

- AWS Secrets Manager
- SSM Parameter Store
- ECS task configuration
- Least-privilege IAM permissions

## 2. Configuration Mapping

| Variable    | Source              | Sensitive |
| ----------- | ------------------- | --------- |
| NODE_ENV    | ECS environment     | No        |
| PORT        | ECS environment     | No        |
| DB_HOST     | Parameter Store/ECS | No        |
| DB_NAME     | Parameter Store/ECS | No        |
| DB_USER     | Secrets Manager     | Yes       |
| DB_PASSWORD | Secrets Manager     | Yes       |
| JWT_SECRET  | Secrets Manager     | Yes       |
| LOG_LEVEL   | Parameter Store/ECS | No        |

## 3. Example Secret Names

/team-task/prod/database
/team-task/prod/jwt

These are illustrative secret identifiers.
Do not put real credentials in documentation.

## 4. ECS Secret Injection

1. Store the secret in Secrets Manager.
2. Grant the ECS task execution role
   permission to retrieve the required secret.
3. Reference the secret in the ECS task
   definition secrets configuration.
4. ECS injects the value into the container.
5. NestJS reads it from process.env.

For startup secret injection, the task
execution role needs appropriate access.

Application SDK retrieval at runtime
instead requires the task role.

## 5. Secret Rotation

- Define a rotation policy.
- Update dependent services safely.
- Restart/redeploy tasks when necessary.
- Test credential changes.
- Revoke old credentials after cutover.

Secrets injected as environment variables
are not automatically refreshed in a
running container after rotation.

## 6. Security Checklist

- [ ] No production secrets in Git
- [ ] .env is ignored
- [ ] Different secrets per environment
- [ ] IAM least privilege
- [ ] No secrets printed in logs
- [ ] Secret rotation planned
- [ ] Access auditing considered

## 7. Current Status

Architecture documentation only.
No AWS secrets created.
