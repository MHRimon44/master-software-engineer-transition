import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ProjectPermission } from '../auth/project-permission';
import { Role } from '../auth/role';
import { ProjectAccessService } from './project-access.service';
import { ProjectRolesGuard } from './project-roles.guard';

describe('ProjectRolesGuard', () => {
  let guard: ProjectRolesGuard;

  const reflectorMock = {
    getAllAndOverride: jest.fn(),
  };

  const projectAccessServiceMock = {
    findMembership: jest.fn(),
  };

  const createContext = (userId: string, projectId: string): ExecutionContext =>
    ({
      getHandler: () => () => undefined,
      getClass: () => class TestController {},
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            id: userId,
          },
          params: {
            projectId,
          },
        }),
      }),
    }) as unknown as ExecutionContext;

  beforeEach(() => {
    jest.clearAllMocks();

    guard = new ProjectRolesGuard(
      reflectorMock as unknown as Reflector,
      projectAccessServiceMock as unknown as ProjectAccessService,
    );
  });

  it('should reject a member without update-task permission', () => {
    reflectorMock.getAllAndOverride.mockReturnValue([
      ProjectPermission.UPDATE_TASK,
    ]);

    projectAccessServiceMock.findMembership.mockReturnValue({
      projectId: 1,
      userId: 'member-user',
      role: Role.MEMBER,
    });

    const context = createContext('member-user', '1');

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should allow an admin with update-task permission', () => {
    reflectorMock.getAllAndOverride.mockReturnValue([
      ProjectPermission.UPDATE_TASK,
    ]);

    projectAccessServiceMock.findMembership.mockReturnValue({
      projectId: 1,
      userId: 'admin-user',
      role: Role.ADMIN,
    });

    const context = createContext('admin-user', '1');

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should reject a user with no membership in the target project', () => {
    reflectorMock.getAllAndOverride.mockReturnValue([
      ProjectPermission.UPDATE_TASK,
    ]);

    projectAccessServiceMock.findMembership.mockReturnValue(undefined);

    const context = createContext('outsider-user', '1');

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should allow when no permissions metadata is defined', () => {
    reflectorMock.getAllAndOverride.mockReturnValue(undefined);

    const context = createContext('any-user', '1');

    expect(guard.canActivate(context)).toBe(true);

    expect(projectAccessServiceMock.findMembership).not.toHaveBeenCalled();
  });
  it('should allow a member with create-task permission', () => {
    reflectorMock.getAllAndOverride.mockReturnValue([
      ProjectPermission.CREATE_TASK,
    ]);

    projectAccessServiceMock.findMembership.mockReturnValue({
      projectId: 1,
      userId: 'member-user',
      role: Role.MEMBER,
    });

    const context = createContext('member-user', '1');

    expect(guard.canActivate(context)).toBe(true);
  });
});
