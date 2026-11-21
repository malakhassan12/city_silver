import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { User } from '../entity/user.entity.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserRoles } from '../../../common/types/enum/role.enum.js';
import { JWTService } from '../../auth/provider/jwt.service.js';
import { HashProvider } from '../../../common/provider/hash.provider.js';
import { UserType } from '../../../common/types/type/user.type.js';
import { randomBytes } from 'node:crypto';
import { GoogleProfile } from '../../../common/types/interface/google.interface.js';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashProvider: HashProvider,
  ) {}

  // Get all users
  async findAll(page: number, limit: number): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  // Get user by UUID
  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  // Get user by email
  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', {
        email: email.trim().toLowerCase(),
      })
      .getOne();
  }
  findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ googleId });
  }

  async createGoogleUser(profile: GoogleProfile): Promise<User> {
    const randomPassword = randomBytes(32).toString('hex');

    const hashedPassword = await this.hashProvider.hashData(randomPassword);

    const newUser = this.usersRepository.create({
      googleId: profile.googleId,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      password: hashedPassword,
      role: UserRoles.CLIENT,
      isEmailVerified: profile.emailVerified,
      isActive: true,
    });

    return await this.usersRepository.save(newUser);
  }
  async linkGoogleId(userId: string, googleId: string): Promise<User> {
    const existingGoogleUser = await this.findByGoogleId(googleId);

    if (existingGoogleUser && existingGoogleUser.id !== userId) {
      throw new ConflictException(
        'Google account is already linked to another user',
      );
    }

    await this.usersRepository.update(
      {
        id: userId,
        googleId: IsNull(),
      },
      {
        googleId,
        isEmailVerified: true,
      },
    );

    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.googleId !== googleId) {
      throw new ConflictException('Unable to link Google account');
    }

    return user;
  }

  findByRole(role: UserRoles): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role })
      .getOne();
  }

  // Create user
  async create(user: CreateUserDto): Promise<User> {
    try {
      const newPass = (await this.hashProvider.hashData(
        user.password,
      )) as string;
      user.password = newPass;
      const newUser = this.usersRepository.create(user);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Unable to create user', {
        cause: error,
      });
    }
  }

  // Delete user
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Update user
  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, userData);

    return this.usersRepository.save(user);
  }

  async changePass(id: string, password: string) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = password;

    return this.usersRepository.save(user);
  }
}
