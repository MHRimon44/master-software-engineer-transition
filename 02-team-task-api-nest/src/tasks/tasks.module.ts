import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { CLOCK, SystemClock } from '../common/clock';

import { ProjectsModule } from '../projects/projects.module';

import { ProjectTaskEntity } from './project-task.entity';

import { ProjectTasksController } from './project-tasks.controller';

import { ProjectTasksRepository } from './project-tasks.repository';

import { TasksController } from './tasks.controller';

import { TasksService } from './tasks.service';

@Module({
  imports: [
    AuthModule,
    ProjectsModule,

    TypeOrmModule.forFeature([ProjectTaskEntity]),
  ],

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
