import { Test, TestingModule } from '@nestjs/testing';

import { CLOCK, type Clock } from '../common/clock';
import { TasksService } from './tasks.service';
import {
  SortDirection,
  TaskSortField,
  TaskStatusFilter,
} from './dto/task-list-query.dto';

describe('TasksService', () => {
  let service: TasksService;

  const fixedDate = new Date('2026-01-01T00:00:00.000Z');

  const fakeClock: Clock = {
    now: () => fixedDate,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: CLOCK,
          useValue: fakeClock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tasks with deterministic generatedAt', () => {
    expect(service.findAll()).toEqual({
      items: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
      page: 1,
      limit: 20,
      total: 5,
      generatedAt: '2026-01-01T00:00:00.000Z',
    });
  });

  it('should paginate tasks', () => {
    expect(
      service.findAll({
        page: 2,
        limit: 2,
        sortBy: TaskSortField.CREATED_AT,
        sortDirection: SortDirection.DESC,
      }),
    ).toEqual({
      items: ['task-3', 'task-4'],
      page: 2,
      limit: 2,
      total: 5,
      generatedAt: '2026-01-01T00:00:00.000Z',
    });
  });

  it('should filter tasks by status', () => {
    expect(
      service.findAll({
        page: 1,
        limit: 20,
        status: TaskStatusFilter.COMPLETED,
        sortBy: TaskSortField.CREATED_AT,
        sortDirection: SortDirection.DESC,
      }),
    ).toEqual({
      items: ['task-2', 'task-4'],
      page: 1,
      limit: 20,
      total: 2,
      generatedAt: '2026-01-01T00:00:00.000Z',
    });
  });

  it('should sort tasks by title descending', () => {
    expect(
      service.findAll({
        page: 1,
        limit: 20,
        sortBy: TaskSortField.TITLE,
        sortDirection: SortDirection.DESC,
      }),
    ).toEqual({
      items: ['task-5', 'task-4', 'task-3', 'task-2', 'task-1'],
      page: 1,
      limit: 20,
      total: 5,
      generatedAt: '2026-01-01T00:00:00.000Z',
    });
  });

  it('should search tasks by title', () => {
    expect(
      service.findAll({
        page: 1,
        limit: 20,
        q: 'task-2',
        sortBy: TaskSortField.CREATED_AT,
        sortDirection: SortDirection.DESC,
      }),
    ).toEqual({
      items: ['task-2'],
      page: 1,
      limit: 20,
      total: 1,
      generatedAt: '2026-01-01T00:00:00.000Z',
    });
  });
});
