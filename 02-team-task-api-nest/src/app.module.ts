import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadAppConfig } from './config/app.config';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { AppLifecycleService } from './app-lifecycle.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          app: loadAppConfig(),
        }),
      ],
    }),
    UsersModule,
    ProjectsModule,
    TasksModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppLifecycleService],
})
export class AppModule {}
