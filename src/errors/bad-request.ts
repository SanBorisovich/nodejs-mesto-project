import { constants } from 'http2';
import ServerError from './server-error';

export default class BadRequest extends ServerError {
  constructor(message: string = 'Некорректные параметры') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}
