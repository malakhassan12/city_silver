
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_API'),
    );
  }

  async sendMessage(data: {
    email: string;
    subject: string;
    content: string;
  }): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.email,
      subject: data.subject,
      html: data.content,
    });

    if (error) {
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
