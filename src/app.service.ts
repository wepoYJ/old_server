import { Injectable, Post } from '@nestjs/common';
import { IResponse } from './interface/IResponse';
import child_process from "child_process"

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  @Post('pull-and-reload')
  update() {
    child_process.exec('./update.sh').on('close', (code, sign) => {
      console.log('[hooks update]',code, sign)
    })
  }
}
