import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import type { RequestWithId } from '../middleware/request-id.middleware';

@Injectable()
export class RequestTimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestTimingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = Date.now();

    const request = context.switchToHttp().getRequest<RequestWithId>();

    return next.handle().pipe(
      finalize(() => {
        const durationMs = Date.now() - startedAt;

        this.logger.log(
          `${request.method} ${request.url} requestId=${request.requestId} durationMs=${durationMs}`,
        );
      }),
    );
  }
}
