import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from '../config/app-config.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const tokenPayloads = new Map<string, Record<string, unknown>>();

  let tokenSequence = 0;

  const jwtServiceMock = {
    signAsync: jest.fn(async (payload: Record<string, unknown>) => {
      tokenSequence++;

      const token = `${String(payload.type)}-token-${tokenSequence}`;

      tokenPayloads.set(token, payload);

      return token;
    }),

    verifyAsync: jest.fn(async (token: string) => {
      const payload = tokenPayloads.get(token);

      if (!payload) {
        throw new Error('invalid token');
      }

      return payload;
    }),
  };

  const appConfigServiceMock = {
    jwtAccessSecret: 'test-access-secret',
    jwtRefreshSecret: 'test-refresh-secret',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    tokenPayloads.clear();
    tokenSequence = 0;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: AppConfigService,
          useValue: appConfigServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a user without exposing credentials', async () => {
    const result = await service.register({
      email: 'User@Example.com',
      password: 'strong-password',
    });

    expect(result).toEqual({
      id: expect.any(String),
      email: 'user@example.com',
    });

    expect(result).not.toHaveProperty('password');

    expect(result).not.toHaveProperty('passwordHash');
  });

  it('should reject duplicate email registration', async () => {
    await service.register({
      email: 'user@example.com',
      password: 'strong-password',
    });

    await expect(
      service.register({
        email: 'USER@example.com',
        password: 'another-password',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('should login with valid credentials and issue tokens', async () => {
    await service.register({
      email: 'user@example.com',
      password: 'strong-password',
    });

    const result = await service.login({
      email: 'USER@example.com',
      password: 'strong-password',
    });

    expect(result).toEqual({
      user: {
        id: expect.any(String),
        email: 'user@example.com',
      },
      tokens: {
        accessToken: expect.stringContaining('access-token-'),
        refreshToken: expect.stringContaining('refresh-token-'),
      },
    });

    expect(result.tokens.accessToken).not.toBe(result.tokens.refreshToken);
  });

  it('should reject an incorrect password', async () => {
    await service.register({
      email: 'user@example.com',
      password: 'strong-password',
    });

    await expect(
      service.login({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should reject an unknown email', async () => {
    await expect(
      service.login({
        email: 'missing@example.com',
        password: 'any-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should rotate refresh token and reject reuse of the old token', async () => {
    await service.register({
      email: 'user@example.com',
      password: 'strong-password',
    });

    const loginResult = await service.login({
      email: 'user@example.com',
      password: 'strong-password',
    });

    const oldRefreshToken = loginResult.tokens.refreshToken;

    const refreshedTokens = await service.refresh(oldRefreshToken);

    expect(refreshedTokens.accessToken).toEqual(
      expect.stringContaining('access-token-'),
    );

    expect(refreshedTokens.refreshToken).toEqual(
      expect.stringContaining('refresh-token-'),
    );

    expect(refreshedTokens.refreshToken).not.toBe(oldRefreshToken);

    await expect(service.refresh(oldRefreshToken)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('should reject an invalid refresh token', async () => {
    await expect(
      service.refresh('not-a-real-refresh-token'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
  it('should revoke refresh token on logout', async () => {
    await service.register({
      email: 'user@example.com',
      password: 'strong-password',
    });

    const loginResult = await service.login({
      email: 'user@example.com',
      password: 'strong-password',
    });

    const refreshToken = loginResult.tokens.refreshToken;

    await service.logout(refreshToken);

    await expect(service.refresh(refreshToken)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
  it('should not issue tokens when password is incorrect', async () => {
    await service.register({
      email: 'user@example.com',
      password: 'strong-password',
    });

    jest.clearAllMocks();

    await expect(
      service.login({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
  });
});
