
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LoggerModule } from '../../common/service/logger/logger.module.js';
import { LoggerService } from '../../common/service/logger/logger.service.js';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, LoggerService],

      useFactory: (
        configService: ConfigService,
        logger: LoggerService,
      ) => {
        logger.log('Initializing database configuration');

        return {
          type: 'postgres' as const,

          url: configService.getOrThrow<string>('DATABASE_URL'),

          autoLoadEntities: true,

          synchronize:
            true,

          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
})
export class DBModule {}
