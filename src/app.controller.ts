import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import child_process from "child_process"
import { ApiTags } from '@nestjs/swagger';

@ApiTags('默认')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('pull-and-reload')
  update() {
    child_process.exec('./update.sh').on('close', (code, sign) => {
      console.log('[hooks update]',code, sign)
    })
  }
}
