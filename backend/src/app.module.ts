import { UserModule } from './app/user/user.module.js';
import { Module, StandardSchemaSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from './common/service/logger/logger.module.js';
import { RolesGuard } from './common/guards/roles.guard.js';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/configuration/env.validation.js';
import { DBModule } from './config/db/db.module.js';
import { AllExceptionsFilter } from './common/filters/allExceptionsFilter.filter.js';
import { AuthModule } from './app/auth/auth.module.js';
import { TransformInterceptor } from './common/interceptors/TransformInterceptor.interceptor.js';
import { AuthGuard } from './common/guards/auth.guard.js';
import { RedisService } from './config/redis/redis.connection.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',

      validationSchema: envValidationSchema,
    }),
    DBModule,
    AuthModule,
    LoggerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: StandardSchemaSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
