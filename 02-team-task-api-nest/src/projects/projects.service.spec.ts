import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { Role } from '../auth/role';
import { RedisCacheService } from '../cache/redis-cache.service';
import { BackgroundJobService } from '../jobs/background-job.service';
import { NotificationService } from '../notifications/notification.service';
import { ProjectMembershipEntity } from './project-membership.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const projectsRepositoryMock = {
    findAll: jest.fn(),
    createWithManager: jest.fn(),
  };

  const membershipRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const entityManagerMock = {
    getRepository: jest.fn(),
  };

  const dataSourceMock = {
    transaction: jest.fn(),
  };

  const redisCacheServiceMock = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };

  const backgroundJobServiceMock = {
    runWithRetry: jest.fn(),
  };

  const notificationServiceMock = {
    sendProjectCreatedNotification: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    entityManagerMock.getRepository.mockReturnValue(membershipRepositoryMock);

    dataSourceMock.transaction.mockImplementation(
      async (
        callback: (manager: typeof entityManagerMock) => Promise<unknown>,
      ) => callback(entityManagerMock),
    );

    redisCacheServiceMock.get.mockResolvedValue(null);
    redisCacheServiceMock.set.mockResolvedValue(undefined);
    redisCacheServiceMock.delete.mockResolvedValue(undefined);

    backgroundJobServiceMock.runWithRetry.mockResolvedValue(undefined);

    notificationServiceMock.sendProjectCreatedNotification.mockResolvedValue(
      undefined,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: ProjectsRepository,
          useValue: projectsRepositoryMock,
        },
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
        {
          provide: RedisCacheService,
          useValue: redisCacheServiceMock,
        },
        {
          provide: BackgroundJobService,
          useValue: backgroundJobServiceMock,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return projects from cache when cache exists', async () => {
    const cachedProjects = [
      {
        id: 1,
        name: 'Cached Project',
      },
    ];

    redisCacheServiceMock.get.mockResolvedValue(cachedProjects);

    await expect(service.findAll()).resolves.toEqual(cachedProjects);

    expect(redisCacheServiceMock.get).toHaveBeenCalledWith('projects:all');

    expect(projectsRepositoryMock.findAll).not.toHaveBeenCalled();

    expect(redisCacheServiceMock.set).not.toHaveBeenCalled();
  });

  it('should return projects from repository and cache them on cache miss', async () => {
    const projects = [
      {
        id: 1,
        name: 'Backend API',
      },
      {
        id: 2,
        name: 'Mobile App',
      },
    ];

    redisCacheServiceMock.get.mockResolvedValue(null);
    projectsRepositoryMock.findAll.mockResolvedValue(projects);

    await expect(service.findAll()).resolves.toEqual(projects);

    expect(redisCacheServiceMock.get).toHaveBeenCalledWith('projects:all');

    expect(projectsRepositoryMock.findAll).toHaveBeenCalledTimes(1);

    expect(redisCacheServiceMock.set).toHaveBeenCalledWith(
      'projects:all',
      projects,
      60,
    );
  });

  it('should create a project, invalidate cache, and schedule notification', async () => {
    const createdProject = {
      id: 1,
      name: 'Team Task API',
    };

    const ownerMembership = {
      id: 1,
      projectId: 1,
      userId: 'owner-user-id',
      role: Role.OWNER,
    };

    projectsRepositoryMock.createWithManager.mockResolvedValue(createdProject);

    membershipRepositoryMock.create.mockReturnValue(ownerMembership);

    membershipRepositoryMock.save.mockResolvedValue(ownerMembership);

    const result = await service.create(
      {
        name: 'Team Task API',
      },
      'owner-user-id',
    );

    expect(result).toEqual(createdProject);

    expect(dataSourceMock.transaction).toHaveBeenCalledTimes(1);

    expect(projectsRepositoryMock.createWithManager).toHaveBeenCalledWith(
      entityManagerMock,
      'Team Task API',
    );

    expect(entityManagerMock.getRepository).toHaveBeenCalledWith(
      ProjectMembershipEntity,
    );

    expect(membershipRepositoryMock.create).toHaveBeenCalledWith({
      projectId: 1,
      userId: 'owner-user-id',
      role: Role.OWNER,
    });

    expect(membershipRepositoryMock.save).toHaveBeenCalledWith(ownerMembership);

    expect(redisCacheServiceMock.delete).toHaveBeenCalledWith('projects:all');

    expect(backgroundJobServiceMock.runWithRetry).toHaveBeenCalledTimes(1);

    expect(backgroundJobServiceMock.runWithRetry).toHaveBeenCalledWith(
      'project-created-notification',
      expect.any(Function),
    );
  });

  it('should execute the scheduled project-created notification job', async () => {
    const createdProject = {
      id: 2,
      name: 'Background Job Project',
    };

    const ownerMembership = {
      id: 2,
      projectId: 2,
      userId: 'owner-user-id',
      role: Role.OWNER,
    };

    projectsRepositoryMock.createWithManager.mockResolvedValue(createdProject);

    membershipRepositoryMock.create.mockReturnValue(ownerMembership);

    membershipRepositoryMock.save.mockResolvedValue(ownerMembership);

    let scheduledJob: (() => Promise<void>) | undefined;

    backgroundJobServiceMock.runWithRetry.mockImplementation(
      async (_name: string, job: () => Promise<void>) => {
        scheduledJob = job;
      },
    );

    await service.create(
      {
        name: 'Background Job Project',
      },
      'owner-user-id',
    );

    expect(scheduledJob).toBeDefined();

    await scheduledJob!();

    expect(
      notificationServiceMock.sendProjectCreatedNotification,
    ).toHaveBeenCalledWith(2, 'Background Job Project');
  });
});
