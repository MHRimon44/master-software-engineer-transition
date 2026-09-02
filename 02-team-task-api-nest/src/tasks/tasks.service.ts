import { Inject, Injectable } from '@nestjs/common';

import { CLOCK, type Clock } from '../common/clock';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
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

  findOne(id: number) {
    return {
      id,
      title: `task-${id}`,
    };
  }

  create(input: CreateTaskDto) {
    return {
      title: input.title,
      completed: false,
      createdAt: this.clock.now().toISOString(),
    };
  }

  update(id: number, input: UpdateTaskDto) {
    return {
      id,
      ...input,
      updatedAt: this.clock.now().toISOString(),
    };
  }
}
