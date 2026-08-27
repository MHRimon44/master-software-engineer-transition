import { Module } from '@nestjs/common';

import { CLOCK, SystemClock } from '../common/clock';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: CLOCK,
      useClass: SystemClock,
    },
  ],
})
export class TasksModule {}
