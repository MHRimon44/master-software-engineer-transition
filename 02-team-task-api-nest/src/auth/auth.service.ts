import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

import { AppConfigService } from '../config/app-config.service';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
}

interface RefreshTokenPayload {
  sub: string;
  email: string;
  type: 'refresh';
  jti: string;
}

@Injectable()
export class AuthService {
  private readonly usersByEmail = new Map<string, StoredUser>();

  private readonly activeRefreshTokenIds = new Set<string>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfigService,
  ) {}

  async register(input: RegisterDto) {
    const email = input.email.trim().toLowerCase();

    if (this.usersByEmail.has(email)) {
      throw new ConflictException('email already registered');
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    const user: StoredUser = {
      id: randomUUID(),
      email,
      passwordHash,
    };

    this.usersByEmail.set(email, user);

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(input: LoginDto) {
    const email = input.email.trim().toLowerCase();

    const user = this.usersByEmail.get(email);

    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('invalid email or password');
    }

    // Important:
    // Only issue tokens AFTER credentials are verified.
    const tokens = await this.issueTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      tokens,
    };
  }

  async refresh(refreshToken: string) {
    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        {
          secret: this.appConfig.jwtRefreshSecret,
        },
      );
    } catch {
      throw new UnauthorizedException('invalid or expired refresh token');
    }

    if (
      payload.type !== 'refresh' ||
      !payload.jti ||
      !this.activeRefreshTokenIds.has(payload.jti)
    ) {
      throw new UnauthorizedException('invalid or expired refresh token');
    }

    const email = payload.email.trim().toLowerCase();

    const user = this.usersByEmail.get(email);

    if (!user || user.id !== payload.sub) {
      throw new UnauthorizedException('invalid or expired refresh token');
    }

    // Refresh-token rotation:
    // old token becomes invalid.
    this.activeRefreshTokenIds.delete(payload.jti);

    return this.issueTokens(user);
  }

  async logout(refreshToken: string): Promise<void> {
    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        {
          secret: this.appConfig.jwtRefreshSecret,
        },
      );
    } catch {
      throw new UnauthorizedException('invalid or expired refresh token');
    }

    if (payload.type !== 'refresh' || !payload.jti) {
      throw new UnauthorizedException('invalid or expired refresh token');
    }

    this.activeRefreshTokenIds.delete(payload.jti);
  }

  private async issueTokens(user: StoredUser) {
    const refreshTokenId = randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          type: 'access',
        },
        {
          secret: this.appConfig.jwtAccessSecret,
          expiresIn: '15m',
        },
      ),

      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          type: 'refresh',
          jti: refreshTokenId,
        },
        {
          secret: this.appConfig.jwtRefreshSecret,
          expiresIn: '7d',
        },
      ),
    ]);

    this.activeRefreshTokenIds.add(refreshTokenId);

    return {
      accessToken,
      refreshToken,
    };
  }
}
