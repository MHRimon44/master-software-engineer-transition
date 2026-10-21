import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendProjectCreatedNotification(
    projectId: number,
    projectName: string,
  ): Promise<void> {
    this.logger.log(
      `notification=project-created projectId=${projectId} projectName=${JSON.stringify(
        projectName,
      )}`,
    );
  }
}
