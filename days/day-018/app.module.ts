import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../day-027/database/database.module';
import { AppController } from './app.controller';
import { AppLifecycleService } from '../day-019/app-lifecycle.service';
import { AppService } from './app.service';
import { RequestIdMiddleware } from '../day-022/common/middleware/request-id.middleware';
import { AppConfigModule } from '../day-019/config/app-config.module';
import { loadAppConfig } from '../day-019/config/app.config';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestTimingInterceptor } from '../day-022/common/interceptors/request-timing.interceptor';
import { AllExceptionsFilter } from '../day-022/common/filters/all-exceptions.filter';
import { ResponseEnvelopeInterceptor } from '../day-023/common/interceptors/response-envelope.interceptor';
import { AuthModule } from '../day-025/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '../day-030/cache/cache.module';
import { JobsModule } from '../day-030/jobs/jobs.module';
import { NotificationsModule } from '../day-030/notifications/notifications.module';

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
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    AuthModule,
    CacheModule,
    AppConfigModule,
    JobsModule,
    NotificationsModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000,
          limit: 100,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppLifecycleService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestTimingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseEnvelopeInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
