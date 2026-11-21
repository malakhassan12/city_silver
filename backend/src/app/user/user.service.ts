import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserRepository } from './repo/user.repo.js';
import { UserType } from '../../common/types/type/user.type.js';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findMe(user: UserType) {
    const userId = user.sub;

    return this.userRepository.findOne(userId);
  }

  findByGoogleId(googleId: string) {
    return this.userRepository.findByGoogleId(googleId);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  createGoogleUser(data: {
    googleId: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
  }) {
    return this.userRepository.createGoogleUser(data);
  }

  linkGoogleId(userId: string, googleId: string) {
    return this.userRepository.linkGoogleId(userId, googleId);
  }
  findAllUser(page: number, limit: number) {
    return this.userRepository.findAll(page, limit);
  }

  findOneUser(id: string) {
    return this.userRepository.findOne(id);
  }

  updateUser(user: UserType, id: string, updateUserDto: UpdateUserDto) {
    const userId = user.sub;

    if (userId !== id) {
      throw new ForbiddenException('You cannot update this user');
    }
    return this.userRepository.update(id, updateUserDto);
  }

  removeUser(user: UserType, id: string) {
    const userId = user.sub;

    if (userId !== id) {
      throw new ForbiddenException('You cannot delete this user');
    }
    return this.userRepository.remove(id);
  }

  changePass(id: string, password: string) {
    return this.userRepository.changePass(id, password);
  }
}
