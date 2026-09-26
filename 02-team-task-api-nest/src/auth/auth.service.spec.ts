import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from '../config/app-config.service';
import { UserEntity } from '../users/user.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const tokenPayloads = new Map<string, Record<string, unknown>>();

  const users = new Map<string, UserEntity>();

  let tokenSequence = 0;
  let userSequence = 0;

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

  const usersRepositoryMock = {
    findOne: jest.fn(
      async ({
        where,
      }: {
        where: {
          email?: string;
        };
      }) => {
        if (!where.email) {
          return null;
        }

        return users.get(where.email) ?? null;
      },
    ),

    create: jest.fn((input: Partial<UserEntity>) => {
      return {
        ...input,
      } as UserEntity;
    }),

    save: jest.fn(async (user: UserEntity) => {
      userSequence++;

      const savedUser = {
        ...user,
        id:
          user.id ??
          `00000000-0000-0000-0000-${String(userSequence).padStart(12, '0')}`,
        createdAt: user.createdAt ?? new Date('2026-01-01T00:00:00.000Z'),
      } as UserEntity;

      users.set(savedUser.email, savedUser);

      return savedUser;
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    tokenPayloads.clear();
    users.clear();

    tokenSequence = 0;
    userSequence = 0;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: usersRepositoryMock,
        },
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

    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        email: 'user@example.com',
      },
    });

    expect(usersRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'user@example.com',
        passwordHash: expect.any(String),
      }),
    );

    expect(usersRepositoryMock.save).toHaveBeenCalledTimes(1);
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

    expect(usersRepositoryMock.save).toHaveBeenCalledTimes(1);
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

    jwtServiceMock.signAsync.mockClear();

    await expect(
      service.login({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
  });
});
