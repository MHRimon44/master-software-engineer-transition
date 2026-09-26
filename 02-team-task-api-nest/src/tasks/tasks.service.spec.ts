import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CLOCK, type Clock } from '../common/clock';
import {
  SortDirection,
  TaskSortField,
  TaskStatusFilter,
} from './dto/task-list-query.dto';
import { ProjectTaskEntity } from './project-task.entity';
import { ProjectTasksRepository } from './project-tasks.repository';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const fixedDate = new Date('2026-01-01T00:00:00.000Z');

  const fakeClock: Clock = {
    now: () => fixedDate,
  };

  const projectTasksRepositoryMock = {
    create: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: CLOCK,
          useValue: fakeClock,
        },
        {
          provide: ProjectTasksRepository,
          useValue: projectTasksRepositoryMock,
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

  it('should create a task for a project', async () => {
    const createdTask = {
      id: 1,
      projectId: 1,
      title: 'project-1-task',
      completed: false,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    } as ProjectTaskEntity;

    projectTasksRepositoryMock.create.mockResolvedValue(createdTask);

    await expect(
      service.createForProject(1, {
        title: 'project-1-task',
      }),
    ).resolves.toEqual(createdTask);

    expect(projectTasksRepositoryMock.create).toHaveBeenCalledWith(
      1,
      'project-1-task',
    );
  });

  it('should reject updating a task through a different project', async () => {
    const existingTask = {
      id: 1,
      projectId: 1,
      title: 'project-1-task',
      completed: false,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    } as ProjectTaskEntity;

    projectTasksRepositoryMock.findById.mockResolvedValue(existingTask);

    await expect(
      service.updateForProject(2, 1, {
        title: 'cross-project-update',
      }),
    ).rejects.toThrow(ForbiddenException);

    expect(projectTasksRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('should reject updating a task that does not exist', async () => {
    projectTasksRepositoryMock.findById.mockResolvedValue(null);

    await expect(
      service.updateForProject(1, 999, {
        title: 'missing-task',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(projectTasksRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('should update a task within the same project', async () => {
    const existingTask = {
      id: 1,
      projectId: 1,
      title: 'original-title',
      completed: false,
      createdAt: fixedDate,
      updatedAt: fixedDate,
    } as ProjectTaskEntity;

    const savedTask = {
      ...existingTask,
      title: 'updated-title',
      completed: true,
    } as ProjectTaskEntity;

    projectTasksRepositoryMock.findById.mockResolvedValue(existingTask);

    projectTasksRepositoryMock.save.mockResolvedValue(savedTask);

    const updatedTask = await service.updateForProject(1, 1, {
      title: 'updated-title',
      completed: true,
    });

    expect(updatedTask).toEqual(savedTask);

    expect(projectTasksRepositoryMock.findById).toHaveBeenCalledWith(1);

    expect(projectTasksRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        projectId: 1,
        title: 'updated-title',
        completed: true,
      }),
    );
  });
});
