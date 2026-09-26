import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';

import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class RedisCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisCacheService.name);

  private readonly client: RedisClientType;

  constructor(private readonly appConfigService: AppConfigService) {
    this.client = createClient({
      url: this.appConfigService.redisUrl,
    });

    this.client.on('error', (error: Error) => {
      this.logger.error(`Redis error: ${error.message}`);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();

    this.logger.log('Redis connection established');
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();

      this.logger.log('Redis connection closed');
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.client.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async ping(): Promise<boolean> {
    if (!this.client.isReady) {
      return false;
    }

    const response = await this.client.ping();

    return response === 'PONG';
  }
}
