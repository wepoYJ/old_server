import { IResponse, INullResponse } from "src/interface/IResponse";

export class Base {
  static response<T>(code: number, data?: T, msg?: string): IResponse<T> {
    return { code, data, msg };
  }
  static nullResponse(code: number, msg?: string): INullResponse {
    return { code, msg };
  }
}
