import { Global, Module } from '@nestjs/common';

import { BackgroundJobService } from './background-job.service';

@Global()
@Module({
  providers: [BackgroundJobService],
  exports: [BackgroundJobService],
})
export class JobsModule {}
