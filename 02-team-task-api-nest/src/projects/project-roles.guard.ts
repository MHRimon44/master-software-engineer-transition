import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { AuthenticatedRequest } from '../auth/authenticated-request';
import { ProjectAccessService } from './project-access.service';
import { PERMISSIONS_KEY } from '../auth/permissions.decorator';
import { ProjectPermission } from '../auth/project-permission';
import { PROJECT_ROLE_PERMISSIONS } from '../auth/project-role-permissions';

@Injectable()
export class ProjectRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly projectAccessService: ProjectAccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      ProjectPermission[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const rawProjectId = request.params.projectId;

    const projectId = Number(rawProjectId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      throw new BadRequestException('projectId must be a positive integer');
    }

    const membership = await this.projectAccessService.findMembership(
      projectId,
      request.user.id,
    );

    if (!membership) {
      throw new ForbiddenException('project access denied');
    }

    const grantedPermissions = PROJECT_ROLE_PERMISSIONS[membership.role];

    const hasAllPermissions = requiredPermissions.every((permission) =>
      grantedPermissions.includes(permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException('insufficient project permission');
    }

    return true;
  }
}
