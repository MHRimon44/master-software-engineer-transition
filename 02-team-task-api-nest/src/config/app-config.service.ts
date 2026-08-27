import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { AppConfig } from './app.config';

type ConfigShape = {
  app: AppConfig;
};

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<ConfigShape, true>,
  ) {}

  get appName(): string {
    return this.configService.get('app.appName', {
      infer: true,
    });
  }

  get port(): number {
    return this.configService.get('app.port', {
      infer: true,
    });
  }
}
