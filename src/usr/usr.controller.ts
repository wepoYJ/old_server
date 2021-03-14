import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Base } from 'src/base/base';
import { CacheService } from 'src/cache/cache.service';
import { MailService } from 'src/mail/mail.service';
import { UsrService } from './usr.service';
import { Util } from 'src/utils/util';
import { RegDto } from './dto/reg.dto';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { Cache } from 'src/base/cache';
import * as crypto from 'crypto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { SendVerifyDto } from './dto/send.verify.dto';

@ApiTags('usr')
@Controller('usr')
export class UsrController {
  constructor(
    private readonly UsrService: UsrService,
    private readonly CacheService: CacheService,
    private readonly MailService: MailService,
  ) { }

  @ApiResponse({
    status: -1,
    description: '验证码错误'
  })
  @ApiOperation({
    summary: '注册用户',
  })
  @Post('reg')
  async reg(
    @Body(new ValidationPipe()) regDto: RegDto
  ) {
    let { email, code, name: un, password: pwd } = regDto
    let key = Cache.getValidateCodeKey(email)
    let cacheCode = await this.CacheService.get(key);
    if (!cacheCode || cacheCode != code) {
      return Base.nullResponse(-1, '验证码错误');
    }
    // 密码加密
    const salt = makeSalt();
    pwd = encryptPassword(pwd, salt);
    let doc = await this.UsrService.insert({
      un, pwd, email, salt
    })
    return Base.nullResponse(0, '注册成功')
  }

  @ApiResponse({
    status: -1,
    description: '用户不存在',
  })
  @ApiResponse({
    status: -2,
    description: '用户名或密码错误',
  })
  @ApiOperation({
    summary: '登录',
  })
  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ) {
    let { email, password: pwd } = loginDto
    let doc = await this.UsrService.find({ email })
    if (doc === null) {
      return Base.nullResponse(-1, '用户不存在');
    }
    let salt = doc.salt
    let tmpPwd = encryptPassword(pwd, salt)
    if (tmpPwd != doc.pwd) {
      return Base.nullResponse(-2, '用户名或密码错误')
    }
    let key = Cache.getTokenKey(email)
    let token = this.createToken(email, pwd);
    await this.CacheService.set(key, token);
    return Base.response(0, { token });
  }

  @ApiResponse({
    status: -1,
    description: '发送失败'
  })
  @ApiOperation({
    summary: '发送验证码',
  })
  @Post('sendVerify')
  async sendVerify(
    @Body() sendVerifyDto: SendVerifyDto
  ) {
    let { email } = sendVerifyDto
    let code = Util.getCode();
    let sec = 300;
    console.log(email, code);
    let key = Cache.getValidateCodeKey(email)
    await this.CacheService.set(key, code, sec);
    try {
      await this.MailService.sendValidCode(email, code, sec);
      return Base.nullResponse(0);
    } catch (e) {
      return Base.nullResponse(-1, '发送失败');
    }
  }

  private createToken(arg1: string, arg2: string) {
    let timeStamp = Date.now()
    return crypto.createHmac('md5', arg1 + timeStamp).update(arg2).digest('hex');
  }
}
