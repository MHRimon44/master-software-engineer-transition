import { Injectable, Logger } from '@nestjs/common';

type BackgroundJob = () => Promise<void>;

@Injectable()
export class BackgroundJobService {
  private readonly logger = new Logger(BackgroundJobService.name);

  async runWithRetry(
    name: string,
    job: BackgroundJob,
    maxAttempts = 3,
    initialDelayMs = 500,
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        this.logger.log(`job=${name} status=started attempt=${attempt}`);

        await job();

        this.logger.log(`job=${name} status=completed attempt=${attempt}`);

        return;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';

        this.logger.warn(
          `job=${name} status=failed attempt=${attempt} error=${JSON.stringify(
            message,
          )}`,
        );

        if (attempt === maxAttempts) {
          this.logger.error(
            `job=${name} status=exhausted attempts=${maxAttempts}`,
          );

          return;
        }

        const delayMs = initialDelayMs * 2 ** (attempt - 1);

        this.logger.log(`job=${name} status=retrying delayMs=${delayMs}`);

        await this.delay(delayMs);
      }
    }
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
}
