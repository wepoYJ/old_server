import { IResponse } from "src/interface/IResponse";

export class Base {
  static createResponse<T>(code: number, data?: T, msg?: string): IResponse<T> {
    return { code, data, msg };
  }
}