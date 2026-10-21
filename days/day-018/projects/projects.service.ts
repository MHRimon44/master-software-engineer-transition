import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Role } from '../../day-026/auth/role';
import { RedisCacheService } from '../../day-030/cache/redis-cache.service';
import { BackgroundJobService } from '../../day-030/jobs/background-job.service';
import { NotificationService } from '../../day-030/notifications/notification.service';

import type { CreateProjectDto } from '../../day-026/projects/dto/create-project.dto';
import { ProjectEntity } from '../../day-027/projects/project.entity';
import { ProjectMembershipEntity } from '../../day-027/projects/project-membership.entity';
import { ProjectsRepository } from '../../day-027/projects/projects.repository';

const PROJECTS_CACHE_KEY = 'projects:all';
const PROJECTS_CACHE_TTL_SECONDS = 60;

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly dataSource: DataSource,
    private readonly redisCacheService: RedisCacheService,
    private readonly backgroundJobService: BackgroundJobService,
    private readonly notificationService: NotificationService,
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    const cachedProjects =
      await this.redisCacheService.get<ProjectEntity[]>(PROJECTS_CACHE_KEY);

    if (cachedProjects !== null) {
      return cachedProjects;
    }

    const projects = await this.projectsRepository.findAll();

    await this.redisCacheService.set(
      PROJECTS_CACHE_KEY,
      projects,
      PROJECTS_CACHE_TTL_SECONDS,
    );

    return projects;
  }

  async create(
    input: CreateProjectDto,
    ownerUserId: string,
  ): Promise<ProjectEntity> {
    const project = await this.dataSource.transaction(async (manager) => {
      const createdProject = await this.projectsRepository.createWithManager(
        manager,
        input.name,
      );

      const memberships = manager.getRepository(ProjectMembershipEntity);

      const ownerMembership = memberships.create({
        projectId: createdProject.id,
        userId: ownerUserId,
        role: Role.OWNER,
      });

      await memberships.save(ownerMembership);

      return createdProject;
    });

    await this.redisCacheService.delete(PROJECTS_CACHE_KEY);

    void this.backgroundJobService.runWithRetry(
      'project-created-notification',
      () =>
        this.notificationService.sendProjectCreatedNotification(
          project.id,
          project.name,
        ),
    );

    return project;
  }
}
