import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { AuthSession } from '../entity/auth.entity.js';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(AuthSession)
    private readonly authSessionRepository: Repository<AuthSession>,
  ) {}

  async createSession(sessionData: Partial<AuthSession>): Promise<AuthSession> {
    const session = this.authSessionRepository.create(sessionData);
    return this.authSessionRepository.save(session);
  }

  async findSessionById(id: string): Promise<AuthSession | null> {
    return this.authSessionRepository.findOne({
      where: { sessionId : id },
    });
  }

  async revokeSession(id: string): Promise<void> {
    await this.authSessionRepository.update(
      { id, revokedAt: IsNull() },
      { revokedAt: new Date() },
    );
  }

  async rotateSession(
    id: string,
    oldHash: string,
    newHash: string,
    expiresAt: Date,
  ): Promise<boolean> {
    const result = await this.authSessionRepository.update(
      {
        id,
        refreshTokenHash: oldHash,
        revokedAt: IsNull(),
        expiresAt: MoreThan(new Date()),
      },
      {
        refreshTokenHash: newHash,
        expiresAt,
        lastUsedAt: new Date(),
      },
    );

    return (result.affected ?? 0) > 0;
  }

  async findOneBySessionIdAndUserId(sid: string, userId: string) {
    const now = new Date();

    const session = await this.authSessionRepository.findOne({
      where: [
        {
          sessionId: sid,
          userId,
          revokedAt: IsNull(),
          expiresAt: MoreThan(now),
        },
       
      ],
    });

    return session;
  }
}
