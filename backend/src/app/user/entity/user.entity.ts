import { UserRoles } from '../../../common/types/enum/role.enum.js';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { Address } from './address.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Object.values(UserRoles),
    default: UserRoles.CLIENT,
  })
  role: UserRoles;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column('varchar', { unique: true, length: 255 })
  @Transform(
    ({ value }) =>
      typeof value === 'string' ? value.toLowerCase().trim() : value,
    { toClassOnly: true },
  )
  email: string;

  @Column('varchar', { unique: true, nullable: true, length: 255 })
  googleId: string | null;

  @Column('varchar',)
  @Exclude({toPlainOnly: true })
  password: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column('varchar', { length: 20, nullable: true })
  phoneNumber: string | null;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Address, (address) => address.user)
  @Type(() => Address)
  addresses: Address[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
