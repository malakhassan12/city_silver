import { UserController } from './user.controller.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service.js';
import { UserRepository } from './repo/user.repo.js';
import { User } from './entity/user.entity.js';
import { Address } from './entity/address.entity.js';
import { JWTService } from '../auth/provider/jwt.service.js';
import { HashProvider } from '../../common/provider/hash.provider.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]),],

  providers: [UserService, UserRepository , HashProvider],

  controllers: [UserController],

  exports: [UserService],
})
export class UserModule {}
