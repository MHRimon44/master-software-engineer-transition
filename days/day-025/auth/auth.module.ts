import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigService } from '../../day-019/config/app-config.service';
import { UserEntity } from '../../day-027/users/user.entity';

import { AccessTokenGuard } from './access-token.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),

    JwtModule.registerAsync({
      inject: [AppConfigService],

      useFactory: (appConfig: AppConfigService) => ({
        secret: appConfig.jwtAccessSecret,

        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, AccessTokenGuard],

  exports: [AuthService, JwtModule, AccessTokenGuard],
})
export class AuthModule {}
