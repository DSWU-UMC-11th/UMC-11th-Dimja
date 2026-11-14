import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse();

    const { code, message } = HttpExceptionFilter.parse(body);

    response.status(status).json({
      isSuccess: false,
      // 서비스에서 code를 직접 지정했다면 그 값을, 아니면 COMMON + 상태코드를 씁니다.
      code: code ?? 'COMMON' + status,
      message: Array.isArray(message) ? message[0] : message,
      result: null,
    });
  }

  private static parse(body: string | object): {
    code?: string;
    message: string | string[];
  } {
    if (typeof body === 'string') {
      return { message: body };
    }
    return body as { code?: string; message: string | string[] };
  }
}
