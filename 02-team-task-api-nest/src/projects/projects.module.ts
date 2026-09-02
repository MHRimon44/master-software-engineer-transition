import { Module } from '@nestjs/common';

import { MockAuthGuard } from '../auth/mock-auth.guard';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, MockAuthGuard],
})
export class ProjectsModule {}
