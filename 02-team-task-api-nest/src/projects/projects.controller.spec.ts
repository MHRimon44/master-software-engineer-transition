import { Test, TestingModule } from '@nestjs/testing';

import { AccessTokenGuard } from '../auth/access-token.guard';
import { ProjectAccessService } from './project-access.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const projectsServiceMock = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const projectAccessServiceMock = {
    addMembership: jest.fn(),
  };

  const accessTokenGuardMock = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: projectsServiceMock,
        },
        {
          provide: ProjectAccessService,
          useValue: projectAccessServiceMock,
        },
      ],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(accessTokenGuardMock)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
