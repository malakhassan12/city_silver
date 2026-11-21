import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { LoggerService } from '../../common/service/logger/logger.service.js';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private readonly configService: ConfigService , private readonly loggerService: LoggerService) {
    this.client = createClient({
      username: this.configService.get<string>('REDIS_USERNAME'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      socket: {
        host: this.configService.getOrThrow<string>('REDIS_HOST'),
        port: this.configService.getOrThrow<number>('REDIS_PORT'),
      },
    });

    this.client.on('error', (error) => {
      this.loggerService.error('Redis Error:', error);
    });
  }

  async onModuleInit() {
    await this.client.connect();
    this.loggerService.log('Redis connected successfully');
  }

  async onModuleDestroy() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  async set(key: string, value: string, ttl: number) {
    return this.client.set(key, value, { EX: ttl });
  }
  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async consume(key: string) {
    return this.client.getDel(key);
  }

  async del(key: string) {
    return this.client.del(key);
  }
}
