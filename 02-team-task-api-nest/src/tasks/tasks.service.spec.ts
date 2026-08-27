import { Test, TestingModule } from '@nestjs/testing';

import { CLOCK, type Clock } from '../common/clock';
import { TasksService } from './tasks.service';

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
      items: ['task-1', 'task-2'],
      generatedAt: '2026-01-01T00:00:00.000Z',
    });
  });
});