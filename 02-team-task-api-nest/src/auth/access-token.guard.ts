import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfigService } from '../config/app-config.service';
import type { AuthenticatedRequest } from './authenticated-request';

interface AccessTokenPayload {
  sub: string;
  email: string;
  type: 'access';
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('access token is required');
    }

    const accessToken = authorization.slice('Bearer '.length).trim();

    if (!accessToken) {
      throw new UnauthorizedException('access token is required');
    }

    let payload: AccessTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
        accessToken,
        {
          secret: this.appConfig.jwtAccessSecret,
        },
      );
    } catch {
      throw new UnauthorizedException('invalid or expired access token');
    }

    if (payload.type !== 'access' || !payload.sub) {
      throw new UnauthorizedException('invalid or expired access token');
    }

    request.user = {
      id: payload.sub,
    };

    return true;
  }
}
