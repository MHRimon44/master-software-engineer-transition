import { randomUUID } from 'node:crypto';

type LogLevel = 'info' | 'warn' | 'error';

type RequestLog = {
  timestamp: string;
  level: LogLevel;
  service: string;
  environment: string;
  requestId: string;
  method: string;
  route: string;
  statusCode: number;
  durationMs: number;
  errorCode?: string;
};

type RequestInput = {
  method: string;
  route: string;
  statusCode: number;
  durationMs: number;
  requestId?: string;
  errorCode?: string;
};

function createRequestLog(input: RequestInput): RequestLog {
  const requestId =
    input.requestId && /^[a-zA-Z0-9_-]{1,128}$/.test(input.requestId)
      ? input.requestId
      : randomUUID();

  const level: LogLevel =
    input.statusCode >= 500 ? 'error' : input.statusCode >= 400 ? 'warn' : 'info';

  return {
    timestamp: new Date().toISOString(),
    level,
    service: 'team-task-api',
    environment: 'development',
    requestId,
    method: input.method,
    route: input.route,
    statusCode: input.statusCode,
    durationMs: input.durationMs,
    ...(input.errorCode ? { errorCode: input.errorCode } : {}),
  };
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }

  console.log(`PASS: ${message}`);
}

const successLog = createRequestLog({
  method: 'GET',
  route: '/tasks',
  statusCode: 200,
  durationMs: 35,
});

const errorLog = createRequestLog({
  method: 'POST',
  route: '/tasks',
  statusCode: 500,
  durationMs: 180,
  requestId: 'req-123',
  errorCode: 'TASK_CREATE_FAILED',
});

console.log(JSON.stringify(successLog));
console.log(JSON.stringify(errorLog));

assert(successLog.level === 'info', 'Successful requests use info level');

assert(errorLog.level === 'error', 'Server failures use error level');

assert(errorLog.requestId === 'req-123', 'Valid request IDs are preserved');

assert(errorLog.errorCode === 'TASK_CREATE_FAILED', 'Error code is included');

assert(
  !('password' in errorLog) && !('authorization' in errorLog),
  'Sensitive fields are not part of log schema',
);

const invalidIdLog = createRequestLog({
  method: 'GET',
  route: '/health',
  statusCode: 200,
  durationMs: 5,
  requestId: 'invalid id with spaces',
});

assert(invalidIdLog.requestId !== 'invalid id with spaces', 'Invalid request IDs are replaced');

console.log('All observability tests passed.');
