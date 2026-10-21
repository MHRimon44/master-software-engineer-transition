import { randomUUID } from 'node:crypto';

import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import type {
  NextFunction,
  Request,
  Response,
} from 'express';

export interface RequestWithId extends Request {
  requestId: string;
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(
    req: RequestWithId,
    res: Response,
    next: NextFunction,
  ): void {
    const incomingRequestId = req.headers['x-request-id'];

    const requestId =
      typeof incomingRequestId === 'string' &&
      incomingRequestId.trim().length > 0
        ? incomingRequestId.trim()
        : randomUUID();

    req.requestId = requestId;

    res.setHeader('x-request-id', requestId);

    next();
  }
}
