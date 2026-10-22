import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../day-025/auth/auth.module';

import { CLOCK, SystemClock } from '../../day-019/common/clock';

import { ProjectsModule } from '../projects/projects.module';

import { ProjectTaskEntity } from '../../day-027/tasks/project-task.entity';

import { ProjectTasksController } from '../../day-026/tasks/project-tasks.controller';

import { ProjectTasksRepository } from '../../day-027/tasks/project-tasks.repository';

import { TasksController } from './tasks.controller';

import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule, ProjectsModule, TypeOrmModule.forFeature([ProjectTaskEntity])],

  controllers: [TasksController, ProjectTasksController],

  providers: [
    TasksService,
    ProjectTasksRepository,

    {
      provide: CLOCK,
      useClass: SystemClock,
    },
  ],
})
export class TasksModule {}
