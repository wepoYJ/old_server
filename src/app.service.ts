import { Injectable } from '@nestjs/common';
import { IResponse } from './interface/IResponse';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
}
