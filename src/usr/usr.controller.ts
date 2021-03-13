import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { stringify } from 'node:querystring';
import { AppService } from 'src/app.service';
import { Base } from 'src/base/base';
import { CacheService } from 'src/cache/cache.service';
import { MailService } from 'src/mail/mail.service';
import { Usr, UsrDocument } from './schemas/usr.schema';
import { UsrService } from './usr.service';

const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

@Controller('usr')
export class UsrController {
  constructor(
    private readonly UsrService: UsrService,
    private readonly CacheService: CacheService,
    private readonly MailService: MailService,
  ) { }

  @Post('reg')
  async reg(
    @Body('name') un: string,
    @Body('password') pwd: string,
    @Body('email') email: string,
    @Body('code') code: string,
  ) {
    let cacheCode = await this.CacheService.get(`${email}:code`);
    if (!cacheCode || cacheCode != code) {
      return Base.createResponse(-1, null, '验证码错误');
    }
    let doc = await this.UsrService.insert({
      un, pwd, email
    })
    let resp = Base.createResponse(0, doc);
    return resp
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') pwd: string,
  ) {
    this.UsrService.find({ email })
  }

  @Post('sendVerify')
  async sendVerify(
    @Body('email') email: string,
  ) {
    let code = this.getCode();
    let sec = 300;
    console.log(email, code);
    await this.CacheService.set(`${email}:code`, code, sec);
    await this.MailService.sendValidCode(email, code, sec);
    return Base.createResponse(0);
  }

  // 将随机生成的整数下标对应的字母放入div中
  private getCode() {
    // 用来生成随机整数
    function getRandom(n, m) { // param: (Number, Number)
      n = Number(n);
      m = Number(m);
      // 确保 m 始终大于 n
      if (n > m) {
          var temp = n;
          n = m;
          m = temp;
      }
      // 下有详细说明
      return Math.floor(Math.random()*(m - n) + n);
    }
    var str = '';
    // 验证码有几位就循环几次
    for (var i = 0;i < 4;i ++) {
        var ran = getRandom(0, 62);
        str += codeStr.charAt(ran);
    }
    return str;
  }

  // @Post('verifyEmail')
  // verifyEmail(
  //   @Body('email') email: string,
  //   @Body('code') code: string,
  // ) {
  //   this.CacheService.set(`${email}:code`, )
  // }
}
