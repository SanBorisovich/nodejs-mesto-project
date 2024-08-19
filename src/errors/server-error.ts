import { constants } from 'http2';

export default class ServerError extends Error {
  message: string;

  statusCode: number;

  get resObj() {
    return {
      message: this.statusCode,
      statusCode: this.message,
    };
  }

  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    this.message = message;
  }
}
