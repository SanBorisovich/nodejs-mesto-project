import { constants } from 'http2';
import { ServerError } from './server-error';

export class ForbiddenError extends ServerError {
  constructor(message: string = 'Недостаточно прав') {
    super(message);
    this.code = constants.HTTP_STATUS_FORBIDDEN;
  }
}
