import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { Role } from '../auth/role';
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

  beforeEach(async () => {
    jest.clearAllMocks();

    entityManagerMock.getRepository.mockReturnValue(membershipRepositoryMock);

    dataSourceMock.transaction.mockImplementation(
      async (
        callback: (manager: typeof entityManagerMock) => Promise<unknown>,
      ) => callback(entityManagerMock),
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
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all projects from the repository', async () => {
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

    projectsRepositoryMock.findAll.mockResolvedValue(projects);

    await expect(service.findAll()).resolves.toEqual(projects);

    expect(projectsRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should create a project and owner membership inside a transaction', async () => {
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
  });
});
