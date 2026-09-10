import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CLOCK, type Clock } from '../common/clock';
import type { CreateTaskDto } from './dto/create-task.dto';
import {
  SortDirection,
  TaskListQueryDto,
  TaskSortField,
  TaskStatusFilter,
} from './dto/task-list-query.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import type { ProjectTask } from './project-task';

@Injectable()
export class TasksService {
  private readonly idempotencyStore = new Map<string, unknown>();
  private readonly projectTasks: ProjectTask[] = [];
  private readonly projectTaskIdempotencyStore = new Map<string, ProjectTask>();

  private nextProjectTaskId = 1;
  constructor(
    @Inject(CLOCK)
    private readonly clock: Clock,
  ) {}

  findAll(query: TaskListQueryDto = new TaskListQueryDto()) {
    const allTasks = [
      {
        title: 'task-1',
        status: TaskStatusFilter.PENDING,
        createdAt: '2026-01-05T00:00:00.000Z',
      },
      {
        title: 'task-2',
        status: TaskStatusFilter.COMPLETED,
        createdAt: '2026-01-04T00:00:00.000Z',
      },
      {
        title: 'task-3',
        status: TaskStatusFilter.PENDING,
        createdAt: '2026-01-03T00:00:00.000Z',
      },
      {
        title: 'task-4',
        status: TaskStatusFilter.COMPLETED,
        createdAt: '2026-01-02T00:00:00.000Z',
      },
      {
        title: 'task-5',
        status: TaskStatusFilter.PENDING,
        createdAt: '2026-01-01T00:00:00.000Z',
      },
    ];

    const filteredTasks = query.status
      ? allTasks.filter((task) => task.status === query.status)
      : allTasks;

    const searchedTasks = query.q
      ? filteredTasks.filter((task) =>
          task.title.toLowerCase().includes(query.q!.toLowerCase()),
        )
      : filteredTasks;

    const sortedTasks = [...searchedTasks].sort((a, b) => {
      let comparison = 0;

      if (query.sortBy === TaskSortField.TITLE) {
        comparison = a.title.localeCompare(b.title);
      } else {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return query.sortDirection === SortDirection.ASC
        ? comparison
        : -comparison;
    });

    const offset = (query.page - 1) * query.limit;

    const pagedTasks = sortedTasks.slice(offset, offset + query.limit);

    return {
      items: pagedTasks.map((task) => task.title),
      page: query.page,
      limit: query.limit,
      total: searchedTasks.length,
      generatedAt: this.clock.now().toISOString(),
    };
  }

  findOne(id: number) {
    return {
      id,
      title: `task-${id}`,
    };
  }

  create(input: CreateTaskDto, idempotencyKey?: string) {
    if (idempotencyKey && this.idempotencyStore.has(idempotencyKey)) {
      return this.idempotencyStore.get(idempotencyKey);
    }

    const createdTask = {
      title: input.title,
      completed: false,
      createdAt: this.clock.now().toISOString(),
    };

    if (idempotencyKey) {
      this.idempotencyStore.set(idempotencyKey, createdTask);
    }

    return createdTask;
  }

  update(id: number, input: UpdateTaskDto) {
    return {
      id,
      ...input,
      updatedAt: this.clock.now().toISOString(),
    };
  }
  createForProject(
    projectId: number,
    input: CreateTaskDto,
    idempotencyKey?: string,
  ): ProjectTask {
    const scopedKey = idempotencyKey
      ? `${projectId}:${idempotencyKey}`
      : undefined;

    if (scopedKey && this.projectTaskIdempotencyStore.has(scopedKey)) {
      return this.projectTaskIdempotencyStore.get(scopedKey)!;
    }

    const now = this.clock.now().toISOString();

    const task: ProjectTask = {
      id: this.nextProjectTaskId++,
      projectId,
      title: input.title,
      completed: false,
      createdAt: now,
    };

    this.projectTasks.push(task);

    if (scopedKey) {
      this.projectTaskIdempotencyStore.set(scopedKey, task);
    }

    return task;
  }

  updateForProject(
    projectId: number,
    taskId: number,
    input: UpdateTaskDto,
  ): ProjectTask {
    const task = this.projectTasks.find((item) => item.id === taskId);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    if (task.projectId !== projectId) {
      throw new ForbiddenException('task does not belong to this project');
    }

    if (input.title !== undefined) {
      task.title = input.title;
    }

    if (input.completed !== undefined) {
      task.completed = input.completed;
    }

    task.updatedAt = this.clock.now().toISOString();

    return task;
  }
}
