import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class VerifyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof HttpException && exception.getStatus() === HttpStatus.BAD_REQUEST) {
      let msg: string, message = (exception.getResponse() as any).message
      if (Array.isArray(message)) {
        msg = message[0]
      } else {
        msg = message
      }
      response.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        msg,
      })
    }
  }
}
