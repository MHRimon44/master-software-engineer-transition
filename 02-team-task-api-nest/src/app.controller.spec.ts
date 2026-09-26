import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisCacheService } from './cache/redis-cache.service';

describe('AppController', () => {
  let appController: AppController;

  const dataSourceMock = {
    query: jest.fn(),
  };

  const redisCacheServiceMock = {
    ping: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    dataSourceMock.query.mockResolvedValue([{ '?column?': 1 }]);
    redisCacheServiceMock.ping.mockResolvedValue(true);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
        {
          provide: RedisCacheService,
          useValue: redisCacheServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('should return healthy status when database and Redis are available', async () => {
      const result = await appController.getHealth();

      expect(result.status).toBe('ok');

      expect(result.dependencies).toEqual({
        database: 'up',
        redis: 'up',
      });

      expect(result.timestamp).toEqual(expect.any(String));
      expect(result.uptimeSeconds).toEqual(expect.any(Number));

      expect(dataSourceMock.query).toHaveBeenCalledWith('SELECT 1');

      expect(redisCacheServiceMock.ping).toHaveBeenCalledTimes(1);
    });
  });
});
