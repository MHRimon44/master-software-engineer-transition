import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import type { AuthenticatedRequest } from './authenticated-request';

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const userId = request.headers['x-user-id'];

    if (typeof userId !== 'string' || userId.trim().length === 0) {
      throw new UnauthorizedException('x-user-id header is required');
    }

    request.user = {
      id: userId.trim(),
    };

    return true;
  }
}
