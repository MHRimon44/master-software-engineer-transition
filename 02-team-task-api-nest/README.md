# Team Task API — NestJS

A learning-focused NestJS API built to practice production-style backend architecture, dependency injection, configuration, validation, authentication guards, request pipeline concerns, and predictable REST API contracts.

## Current Features

- Modular NestJS architecture
- Users, Projects, and Tasks modules
- Dependency injection with swappable abstractions
- Typed application configuration
- Application lifecycle logging
- DTO-based request validation
- Custom route parameter validation
- Mock request authentication with guards
- Request ID middleware
- Request timing interceptor
- Global exception handling
- Consistent success and error response envelopes
- REST-oriented route conventions

---

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

The root `AppModule` composes the feature modules and application-level infrastructure.

Feature modules keep controllers and services grouped by domain responsibility.

---

## Application Configuration

Application configuration is loaded centrally and accessed through the typed `AppConfigService`.

Required environment variables:

```text
APP_NAME
PORT
```

Example:

```bash
APP_NAME=team-task-api PORT=3000 npm run start:dev
```

Invalid or missing required configuration causes application startup to fail instead of allowing the application to run with an invalid configuration.

Application code should avoid scattered direct access to:

```ts
process.env;
```

and use the centralized configuration abstraction instead.

---

## Dependency Injection

Infrastructure dependencies are injected instead of being created directly inside business services.

For example, `TasksService` depends on the `Clock` abstraction:

```ts
constructor(
  @Inject(CLOCK)
  private readonly clock: Clock,
) {}
```

This allows the dependency to be swapped with a fake implementation during testing.

Benefits include:

- easier unit testing
- lower coupling
- replaceable infrastructure
- predictable behavior in tests
- clearer dependency boundaries

---

## Request Validation

Task request bodies are validated before service logic runs.

Validation policy:

- DTO validation uses `class-validator`.
- Global `ValidationPipe` enables `whitelist`.
- Unknown fields are rejected with `forbidNonWhitelisted`.
- Input transformation is enabled.
- Route task IDs are converted from strings to positive integers by `PositiveIntPipe`.
- Invalid input returns HTTP `400 Bad Request`.

### Create Task DTO

The task title must:

- be a string
- not be empty
- contain at most 120 characters

### Update Task DTO

Supported optional fields include:

```text
title
completed
```

Input is validated before reaching service logic.

### Validation Error Examples

DTO validation example:

```json
{
  "requestId": "request-123",
  "error": {
    "message": ["completed must be a boolean value"],
    "error": "Bad Request",
    "statusCode": 400
  }
}
```

Custom route parameter pipe example:

```json
{
  "requestId": "request-123",
  "error": {
    "message": "id must be a positive integer",
    "error": "Bad Request",
    "statusCode": 400
  }
}
```

Nest's default DTO validation may return an array of validation messages, while the custom pipe currently returns a single string message.

The HTTP status and top-level API error envelope remain predictable.

---

## Authentication Guard

Projects and Tasks routes are protected by a temporary mock authentication guard.

Clients provide:

```http
x-user-id: user-123
```

The guard:

1. reads the `x-user-id` header
2. rejects missing or empty values
3. normalizes the value
4. attaches authenticated user context to the request

Normalized request context:

```ts
{
  user: {
    id: 'user-123';
  }
}
```

Missing authentication returns:

```http
401 Unauthorized
```

Example:

```json
{
  "requestId": "request-123",
  "error": {
    "message": "x-user-id header is required",
    "error": "Unauthorized",
    "statusCode": 401
  }
}
```

The health endpoint remains public:

```http
GET /health
```

---

## NestJS Request Pipeline

| Tool             | Main Responsibility                                      | Example in This Project                                 |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| Middleware       | Early request preprocessing and generic request concerns | Generate/propagate `x-request-id`                       |
| Guard            | Decide whether a request may proceed                     | Require `x-user-id` for protected routes                |
| Pipe             | Validate or transform controller input                   | Validate DTOs and convert task ID to a positive integer |
| Interceptor      | Wrap handler execution for cross-cutting behavior        | Measure request duration and log timing                 |
| Exception Filter | Catch exceptions and produce consistent failures         | Standard error envelope with `requestId`                |

### Simplified Request Flow

```text
Request
   ↓
Middleware
   ↓
Guard
   ↓
Interceptor (before)
   ↓
Pipe
   ↓
Controller / Service
   ↓
Interceptor (after)
   ↓
Response
```

When an exception occurs:

```text
Exception
   ↓
Exception Filter
   ↓
Safe HTTP Error Response
```

### Decision Rules

Need something for almost every incoming request before routing?

```text
Middleware
```

Need to decide whether the request is allowed?

```text
Guard
```

Need to validate or transform controller input?

```text
Pipe
```

Need behavior around controller execution, such as timing or logging?

```text
Interceptor
```

Need centralized exception-to-response handling?

```text
Exception Filter
```

---

## Request IDs

Every request receives a request ID.

Clients may provide one:

```http
x-request-id: frontend-request-123
```

If no request ID is supplied, the middleware generates one using `randomUUID()`.

The request ID is:

- attached to the request
- returned in the `x-request-id` response header
- included in API error responses
- included in success response envelopes
- included in request timing logs
- included in unexpected error logs

Example response header:

```http
x-request-id: frontend-request-123
```

Request IDs make it easier to correlate:

```text
client request
→ API response
→ timing log
→ error log
```

---

## Request Timing

A global interceptor measures request execution time.

Example server log:

```text
[RequestTimingInterceptor] GET /health requestId=timing-test-123 durationMs=1
```

The timing interceptor is implemented as an interceptor because it needs to wrap handler execution and run logic after processing completes.

---

## Exception Handling

A global exception filter handles HTTP and unexpected exceptions.

Known `HttpException` status codes are preserved.

Unexpected errors return:

```http
500 Internal Server Error
```

with a safe client response.

Example:

```json
{
  "requestId": "error-test-123",
  "error": {
    "message": "Internal server error",
    "error": "Internal Server Error",
    "statusCode": 500
  }
}
```

Internal stack traces and sensitive implementation details are not exposed to clients.

The real error and stack trace remain available in server logs together with the request ID.

Example server log:

```text
[AllExceptionsFilter] Unhandled error requestId=error-test-123
Error: ...
```

---

## REST API Conventions

Routes are designed around resources rather than action names.

Use:

```text
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
```

Avoid action-style routes such as:

```text
/getTasks
/createTask
/updateTask
/deleteTask
```

The HTTP method already communicates the intended operation.

---

## Current Routes

### Application

```http
GET /
GET /health
```

### Users

```http
GET /users
```

### Projects

```http
GET /projects
```

Protected with `x-user-id`.

### Tasks

```http
GET   /tasks
GET   /tasks/:id
POST  /tasks
PATCH /tasks/:id
```

Task routes are protected with `x-user-id`.

---

## API Response Conventions

API responses use predictable success and error contracts.

### Success Envelope

Successful responses containing data use:

```json
{
  "requestId": "request-123",
  "data": {}
}
```

Example:

```http
GET /health
```

Response:

```json
{
  "requestId": "success-test-123",
  "data": {
    "status": "ok"
  }
}
```

### Created Resource

A successfully created resource returns:

```http
201 Created
```

Example:

```http
POST /tasks
```

Request:

```json
{
  "title": "Learn REST contracts"
}
```

Response:

```json
{
  "requestId": "create-test-123",
  "data": {
    "title": "Learn REST contracts",
    "completed": false,
    "createdAt": "2026-09-03T05:51:48.708Z"
  }
}
```

### No Content

`204 No Content` intentionally contains no response body.

The success envelope interceptor must not introduce a body into a `204` response.

### Error Envelope

Errors use:

```json
{
  "requestId": "request-123",
  "error": {
    "message": "Human-readable error",
    "error": "Error Type",
    "statusCode": 400
  }
}
```

For validation errors, `message` may also be an array:

```json
{
  "requestId": "bad-request-123",
  "error": {
    "message": ["title should not be empty"],
    "error": "Bad Request",
    "statusCode": 400
  }
}
```

---

## HTTP Status Code Conventions

| Status             | Meaning                                                  | Example                          |
| ------------------ | -------------------------------------------------------- | -------------------------------- |
| `200 OK`           | Successful read/update with a response body              | `GET /tasks`, `PATCH /tasks/:id` |
| `201 Created`      | A new resource was created                               | `POST /tasks`                    |
| `204 No Content`   | Successful operation with intentionally no response body | Successful delete                |
| `400 Bad Request`  | Request input is invalid                                 | DTO validation failure           |
| `401 Unauthorized` | Authentication information is missing or invalid         | Missing `x-user-id`              |
| `404 Not Found`    | Requested resource does not exist                        | Task ID does not exist           |
| `409 Conflict`     | Request conflicts with the current resource/system state | Duplicate unique value           |

### `400` vs `404` vs `409`

Use `400 Bad Request` when the request itself is invalid.

Example:

```text
title is empty
invalid route parameter
invalid field type
```

Use `404 Not Found` when the request is valid but the requested resource does not exist.

Example:

```http
GET /tasks/999
```

when task `999` does not exist.

Use `409 Conflict` when the request is valid but cannot be completed because it conflicts with the current state.

Example:

```text
creating a resource with an already-existing unique value
```

---

## Resource Nesting

Nested resources may be used when the parent-child relationship is an important part of the API contract.

Example:

```http
GET /projects/7/tasks
```

A collection query may alternatively use filtering:

```http
GET /tasks?projectId=7
```

Deep nesting should generally be avoided when it makes routes difficult to understand or maintain.

Avoid unnecessarily deep structures such as:

```text
/projects/7/tasks/12/comments/5/attachments
```

---

## Backward-Compatible API Thinking

API response structures are contracts consumed by other software.

Changing an existing field name can break clients.

For example, changing:

```json
{
  "data": {
    "title": "Learn NestJS"
  }
}
```

to:

```json
{
  "data": {
    "taskTitle": "Learn NestJS"
  }
}
```

may break clients that still read:

```ts
response.data.title;
```

Prefer additive, backward-compatible changes when possible.

For example:

```json
{
  "data": {
    "title": "Learn NestJS",
    "completed": false
  }
}
```

Adding a new optional field is generally safer than removing or renaming an existing contract field.

Breaking API contract changes should be deliberate and versioned when necessary.

---

## Running the Application

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
APP_NAME=team-task-api PORT=3000 npm run start:dev
```

Build:

```bash
APP_NAME=team-task-api PORT=3000 npm run build
```

Run tests:

```bash
APP_NAME=team-task-api PORT=3000 npm test
```

---

## Example Requests

### Health Check

```bash
curl -i http://localhost:3000/health \
  -H "x-request-id: health-test-123"
```

### Get Tasks

```bash
curl -i http://localhost:3000/tasks \
  -H "x-user-id: user-123" \
  -H "x-request-id: tasks-test-123"
```

### Create Task

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "x-user-id: user-123" \
  -H "x-request-id: create-test-123" \
  -d '{"title":"Learn REST contracts"}'
```

### Invalid Create Task

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "x-user-id: user-123" \
  -H "x-request-id: bad-request-123" \
  -d '{"title":""}'
```

### Unauthorized Request

```bash
curl -i http://localhost:3000/tasks \
  -H "x-request-id: auth-error-123"
```

---

## Engineering Principles Practiced

This project currently demonstrates:

- modular architecture
- separation of concerns
- dependency inversion
- centralized configuration
- fail-fast configuration validation
- request validation before business logic
- authentication outside controllers
- request correlation using request IDs
- centralized logging concerns
- safe exception handling
- predictable REST response contracts
- deliberate HTTP status code semantics
