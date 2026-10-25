import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: vi.fn().mockReturnValue('Hello World!'),
            getHealth: vi.fn(),
            getDatabaseTest: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should return Hello World!', () => {
    expect(controller.getHello()).toBe('Hello World!');
  });
});
