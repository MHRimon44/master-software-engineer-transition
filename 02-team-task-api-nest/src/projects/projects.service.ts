import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { Role } from '../auth/role';

import type { CreateProjectDto } from './dto/create-project.dto';

import { ProjectMembershipEntity } from './project-membership.entity';

import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,

    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.projectsRepository.findAll();
  }

  create(input: CreateProjectDto, ownerUserId: string) {
    return this.dataSource.transaction(async (manager) => {
      const project = await this.projectsRepository.createWithManager(
        manager,
        input.name,
      );

      const memberships = manager.getRepository(ProjectMembershipEntity);

      const ownerMembership = memberships.create({
        projectId: project.id,
        userId: ownerUserId,
        role: Role.OWNER,
      });

      await memberships.save(ownerMembership);

      return project;
    });
  }
}
