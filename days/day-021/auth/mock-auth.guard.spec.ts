import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { MockAuthGuard } from './mock-auth.guard';

describe('MockAuthGuard', () => {
  const guard = new MockAuthGuard();

  function createContext(
    headers: Record<string, string | undefined>,
  ): ExecutionContext {
    const request = {
      headers,
    };

    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
  }

  it('rejects a request without x-user-id', () => {
    const context = createContext({});

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('allows a request and attaches normalized user', () => {
    const request = {
      headers: {
        'x-user-id': '  user-123  ',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);

    expect(request).toHaveProperty('user', {
      id: 'user-123',
    });
  });
});
