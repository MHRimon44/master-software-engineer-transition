import { Injectable } from '@nestjs/common';

import { Role } from '../auth/role';
import type { ProjectMembership } from './project-membership';

@Injectable()
export class ProjectAccessService {
  private readonly memberships: ProjectMembership[] = [
    {
      projectId: 1,
      userId: 'owner-user',
      role: Role.OWNER,
    },
    {
      projectId: 1,
      userId: 'admin-user',
      role: Role.ADMIN,
    },
    {
      projectId: 1,
      userId: 'member-user',
      role: Role.MEMBER,
    },
    {
      projectId: 2,
      userId: 'other-project-user',
      role: Role.OWNER,
    },
  ];
  addMembership(
    projectId: number,
    userId: string,
    role: Role,
  ): ProjectMembership {
    const membership: ProjectMembership = {
      projectId,
      userId,
      role,
    };

    this.memberships.push(membership);

    return membership;
  }

  findMembership(
    projectId: number,
    userId: string,
  ): ProjectMembership | undefined {
    return this.memberships.find(
      (membership) =>
        membership.projectId === projectId && membership.userId === userId,
    );
  }
}
