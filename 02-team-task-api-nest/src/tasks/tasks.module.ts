import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CLOCK, SystemClock } from '../common/clock';
import { ProjectsModule } from '../projects/projects.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ProjectTasksController } from './project-tasks.controller';

@Module({
  imports: [AuthModule, ProjectsModule],
  controllers: [TasksController, ProjectTasksController],
  providers: [
    TasksService,
    {
      provide: CLOCK,
      useClass: SystemClock,
    },
  ],
})
export class TasksModule {}
