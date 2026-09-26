import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RedisCacheService } from './cache/redis-cache.service';

@Injectable()
export class AppService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHealth() {
    const databaseHealthy = await this.checkDatabase();
    const redisHealthy = await this.checkRedis();

    const healthy = databaseHealthy && redisHealthy;

    const health = {
      status: healthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      dependencies: {
        database: databaseHealthy ? 'up' : 'down',
        redis: redisHealthy ? 'up' : 'down',
      },
    };

    if (!healthy) {
      throw new ServiceUnavailableException(health);
    }

    return health;
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      return await this.redisCacheService.ping();
    } catch {
      return false;
    }
  }
}
