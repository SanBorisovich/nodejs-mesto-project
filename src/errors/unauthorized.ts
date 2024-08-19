import { constants } from 'http2';
import ServerError from './server-error';

export default class UnauthorizedError extends ServerError {
  constructor(message: string = 'Требуется авторизация') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NETWORK_AUTHENTICATION_REQUIRED;
  }
}
