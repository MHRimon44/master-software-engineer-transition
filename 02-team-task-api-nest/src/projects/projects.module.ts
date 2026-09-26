import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { ProjectAccessService } from './project-access.service';

import { ProjectMembershipEntity } from './project-membership.entity';

import { ProjectEntity } from './project.entity';

import { ProjectRolesGuard } from './project-roles.guard';

import { ProjectsController } from './projects.controller';

import { ProjectsRepository } from './projects.repository';

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
