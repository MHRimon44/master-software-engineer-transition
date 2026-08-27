import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return ['task-1', 'task-2'];
  }
}
