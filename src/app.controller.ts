import { Controller, Get, Post, Response, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from "child_process"
import { promisify } from "util"
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Base } from './base/base';

const execAsync = promisify(exec)

@ApiTags('默认')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({
    summary: 'No Access To Visit',
  })
  @Get()
  getHello(): string {
    throw new BadRequestException('No Access To Visit.')
  }

  @ApiOperation({
    summary: '自动脚本',
    description: '拉取最新代码 > 更新依赖 > 构建 > 重启PM2'
  })
  @Post('pull-and-reload')
  async update() {
    let now = Date.now(), respMsg: any
    await execAsync('./update.sh')
      .catch(e => {
        console.error(e)
      })
      .finally(() => {
        let time = (Date.now() - now) / 1000
        let msg = `自动部署完毕，耗时：${time}`
        respMsg = msg
        console.log(msg)
      })
    return Base.nullResponse(0, respMsg)
  }
}
