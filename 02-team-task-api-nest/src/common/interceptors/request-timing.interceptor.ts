import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import type { RequestWithId } from '../middleware/request-id.middleware';

@Injectable()
export class RequestTimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestTimingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = Date.now();

    const http = context.switchToHttp();

    const request = http.getRequest<RequestWithId>();
    const response = http.getResponse<Response>();

    return next.handle().pipe(
      finalize(() => {
        const durationMs = Date.now() - startedAt;

        this.logger.log(
          JSON.stringify({
            event: 'http_request_completed',
            method: request.method,
            path: request.path,
            statusCode: response.statusCode,
            requestId: request.requestId,
            durationMs,
          }),
        );
      }),
    );
  }
}
