import { Module } from '@nestjs/common';

import { CLOCK, SystemClock } from '../common/clock';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MockAuthGuard } from '../auth/mock-auth.guard';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    MockAuthGuard,
    {
      provide: CLOCK,
      useClass: SystemClock,
    },
  ],
})
export class TasksModule {}
