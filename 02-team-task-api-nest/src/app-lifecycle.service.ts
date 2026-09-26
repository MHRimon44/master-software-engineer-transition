import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

import { AppConfigService } from './config/app-config.service';

@Injectable()
export class AppLifecycleService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(AppLifecycleService.name);

  constructor(private readonly appConfig: AppConfigService) {}

  onApplicationBootstrap(): void {
    this.logger.log(
      JSON.stringify({
        event: 'application_initialized',
        appName: this.appConfig.appName,
      }),
    );
  }

  onApplicationShutdown(signal?: string): void {
    this.logger.log(
      JSON.stringify({
        event: 'application_shutdown',
        appName: this.appConfig.appName,
        signal: signal ?? 'unknown',
      }),
    );
  }
}
