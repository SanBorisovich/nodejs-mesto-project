import { constants } from 'http2';
import ServerError from './server-error';

export default class ForbiddenError extends ServerError {
  constructor(message: string = 'Недостаточно прав') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}
