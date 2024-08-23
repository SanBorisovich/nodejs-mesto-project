import { constants } from 'http2';
import { ServerError } from './server-error';

export class BadRequest extends ServerError {
  constructor(message: string = 'Некорректные параметры') {
    super(message);
    this.code = constants.HTTP_STATUS_BAD_REQUEST;
  }
}
