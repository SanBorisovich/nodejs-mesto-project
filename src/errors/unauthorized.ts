import { constants } from 'http2';
import { ServerError } from './server-error';

export class UnauthorizedError extends ServerError {
  constructor(message: string = 'Требуется авторизация') {
    super(message);
    this.code = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}
