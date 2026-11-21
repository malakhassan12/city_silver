import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';

import { User } from './user.entity.js';
import { Governorate } from '../../../common/types/enum/governorate.enum.js';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  recipientName: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Governorate,
    enumName: 'governorate_enum',
  })
  governorate: Governorate;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  buildingNumber: string;

  @Column({ nullable: true })
  apartmentNumber: string;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: Relation<User>;
}
