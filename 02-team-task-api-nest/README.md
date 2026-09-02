## Module Dependency Diagram

```text
AppModule
├── UsersModule
│   ├── UsersController
│   └── UsersService
├── ProjectsModule
│   ├── ProjectsController
│   └── ProjectsService
└── TasksModule
    ├── TasksController
    └── TasksService
```

## Request Validation

Task request bodies are validated before service logic runs.

Validation policy:

- DTO validation uses `class-validator`.
- Global `ValidationPipe` enables `whitelist`.
- Unknown fields are rejected with `forbidNonWhitelisted`.
- Route task IDs are converted from strings to positive integers by `PositiveIntPipe`.
- Invalid input returns HTTP `400 Bad Request`.

Observed validation error shape:

```ts
type ValidationErrorResponse = {
  message: string | string[];
  error: 'Bad Request';
  statusCode: 400;
};
```

Examples:

```json
{
  "message": ["completed must be a boolean value"],
  "error": "Bad Request",
  "statusCode": 400
}
```

```json
{
  "message": "id must be a positive integer",
  "error": "Bad Request",
  "statusCode": 400
}
```

Tradeoff: Nest's default DTO validation returns an array of messages,
while the custom pipe currently returns one string message. The top-level
error fields and HTTP status remain predictable.

## NestJS Request Pipeline

| Tool             | Main Responsibility                                        | Example in This Project                               |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| Middleware       | Pre-routing request concerns                               | Generate/propagate `x-request-id`                     |
| Guard            | Decide whether a request may proceed                       | Require `x-user-id` for protected routes              |
| Pipe             | Validate or transform input                                | Validate DTOs and convert task ID to positive integer |
| Interceptor      | Wrap request/response execution for cross-cutting behavior | Measure request duration and log timing               |
| Exception Filter | Catch exceptions and produce consistent failures           | Standard error envelope with `requestId`              |

### Decision Rules

- Need something for almost every incoming request before routing? → **Middleware**
- Need to decide whether the request is allowed? → **Guard**
- Need to validate or transform controller input? → **Pipe**
- Need behavior around controller execution, such as timing/logging? → **Interceptor**
- Need centralized exception-to-response handling? → **Exception Filter**
