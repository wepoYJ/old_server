import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  public async sendValidCode(targetMail: string, code: string, seconds: number): Promise<void> {
    const mins = Math.floor(seconds / 60);
    await this.mailerService.sendMail({
      to: targetMail,
      text: `[Wepo] 验证码为：${code},有效期为${mins}分钟`
    })
  }
}
