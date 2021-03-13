import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailConf } from 'src/constants/constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  public async sendValidCode(targetMail: string, code: string, seconds: number): Promise<void> {
    const mins = Math.floor(seconds / 60);
    // console.log(targetMail, EmailConf.host)
    await this.mailerService.sendMail({
      to: targetMail,
      from: EmailConf.host,
      subject: 'verification',
      text: `[Wepo] your registration verification code is: [${code}]，Valid for ${mins} minutes. Please don't tell anyone.`
    }).catch((e) => {
      console.error('验证码发送失败', e)
      return Promise.reject(e)
    })
  }
}
