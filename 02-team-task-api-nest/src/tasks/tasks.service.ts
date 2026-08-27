import { Inject, Injectable } from '@nestjs/common';

import { CLOCK, type Clock } from '../common/clock';

@Injectable()
export class TasksService {
  constructor(
    @Inject(CLOCK)
    private readonly clock: Clock,
  ) {}

  findAll() {
    return {
      items: ['task-1', 'task-2'],
      generatedAt: this.clock.now().toISOString(),
    };
  }
}
