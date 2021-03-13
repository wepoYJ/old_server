import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class VerifyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof HttpException && exception.getStatus() === HttpStatus.BAD_REQUEST) {
      let msg: string
      try {
        msg = (exception.getResponse() as any).message[0]
      } catch {
        msg = exception.message
      }
      response.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        msg,
      })
    }
  }
}
