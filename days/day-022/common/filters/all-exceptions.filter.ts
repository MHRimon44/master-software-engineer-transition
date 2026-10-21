import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

import type { RequestWithId } from '../middleware/request-id.middleware';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request = context.getRequest<RequestWithId>();
    const response = context.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!(exception instanceof HttpException)) {
      this.logger.error(
        JSON.stringify({
          event: 'unhandled_exception',
          method: request.method,
          path: request.path,
          requestId: request.requestId,
          error:
            exception instanceof Error ? exception.message : 'Unknown error',
        }),
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: 'Internal server error',
            error: 'Internal Server Error',
            statusCode: 500,
          };

    response.status(status).json({
      requestId: request.requestId,
      error: message,
    });
  }
}
