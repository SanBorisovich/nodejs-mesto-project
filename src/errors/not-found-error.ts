import { constants } from 'http2';
import ServerError from './server-error';

export default class NotFoundError extends ServerError {
  constructor(message: string = 'Не найдено') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}
