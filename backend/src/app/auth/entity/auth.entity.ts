import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  sessionId: string;

  @Column()
  refreshTokenHash: string;

  @Column()
  expiresAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  revokedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastUsedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  userAgent: string | null;
}
