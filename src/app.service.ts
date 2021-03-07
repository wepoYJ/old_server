import { Injectable } from '@nestjs/common';
import { IResponse } from './interface/IResponse';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getResponse<T>(code: number, data: T, msg?: string): IResponse<T> {
    return { code, data, msg };
  }
}
