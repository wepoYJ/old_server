import { Controller, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UsrService } from './usr.service';
@Controller('usr')
export class UsrController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Post('reg')
  reg() {
    let resp = this.appService.getResponse(0, {
      uid: 1
    })
    return resp
  }

  @Post('login')
  login() {
    let resp = this.appService.getResponse(0, {
      token: 'giao'
    })
    return resp
  }
}
