import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Role } from '../auth/role';

import { ProjectMembershipEntity } from './project-membership.entity';

@Injectable()
export class ProjectAccessService {
  constructor(
    @InjectRepository(ProjectMembershipEntity)
    private readonly memberships: Repository<ProjectMembershipEntity>,
  ) {}

  addMembership(projectId: number, userId: string, role: Role) {
    const membership = this.memberships.create({
      projectId,
      userId,
      role,
    });

    return this.memberships.save(membership);
  }

  findMembership(projectId: number, userId: string) {
    return this.memberships.findOne({
      where: {
        projectId,
        userId,
      },
    });
  }
}
