import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

// MySQL의 UNIQUE 제약 위반 에러 코드입니다.
const MYSQL_DUPLICATE_ENTRY = 'ER_DUP_ENTRY';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const driverError = exception.driverError as { code?: string } | undefined;

    // UNIQUE 위반은 사전 중복 체크를 통과해도 동시 요청에서 생길 수 있습니다.
    // 서비스가 던지는 409와 같은 형식으로 맞춰서 응답합니다.
    if (driverError?.code === MYSQL_DUPLICATE_ENTRY) {
      response.status(HttpStatus.CONFLICT).json({
        isSuccess: false,
        code: 'COMMON4091',
        message: '이미 존재하는 데이터입니다.',
        result: null,
      });
      return;
    }

    // 그 외 DB 오류는 내부 정보가 새지 않도록 일반 메시지로 응답합니다.
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      code: 'COMMON500',
      message: '서버 오류가 발생했습니다.',
      result: null,
    });
  }
}
