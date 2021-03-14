import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import child_process from "child_process"
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('默认')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @ApiOperation({
    summary: '自动脚本',
    description: '拉取最新代码 > 更新依赖 > 构建 > 重启PM2'
  })
  @Post('pull-and-reload')
  update() {
    child_process.exec('./update.sh').on('close', (code, sign) => {
      console.log('[hooks update]',code, sign)
    })
  }
}
