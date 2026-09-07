import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CLOCK, SystemClock } from '../common/clock';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule],
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
