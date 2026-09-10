import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ProjectAccessService } from './project-access.service';
import { ProjectRolesGuard } from './project-roles.guard';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [AuthModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectAccessService, ProjectRolesGuard],
  exports: [ProjectAccessService, ProjectRolesGuard],
})
export class ProjectsModule {}
