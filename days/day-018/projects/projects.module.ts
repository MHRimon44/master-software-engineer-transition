import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../day-025/auth/auth.module';

import { ProjectAccessService } from '../../day-026/projects/project-access.service';

import { ProjectMembershipEntity } from '../../day-027/projects/project-membership.entity';

import { ProjectEntity } from '../../day-027/projects/project.entity';

import { ProjectRolesGuard } from '../../day-026/projects/project-roles.guard';

import { ProjectsController } from './projects.controller';

import { ProjectsRepository } from '../../day-027/projects/projects.repository';

import { ProjectsService } from './projects.service';

@Module({
  imports: [
    AuthModule,

    TypeOrmModule.forFeature([ProjectEntity, ProjectMembershipEntity]),
  ],

  controllers: [ProjectsController],

  providers: [
    ProjectsService,
    ProjectsRepository,
    ProjectAccessService,
    ProjectRolesGuard,
  ],

  exports: [ProjectAccessService, ProjectRolesGuard],
})
export class ProjectsModule {}
