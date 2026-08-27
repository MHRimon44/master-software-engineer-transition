import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

import { AppConfigService } from './config/app-config.service';

@Injectable()
export class AppLifecycleService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppLifecycleService.name);

  constructor(private readonly appConfig: AppConfigService) {}

  onApplicationBootstrap(): void {
    this.logger.log(`Application "${this.appConfig.appName}" initialized`);
  }
}
