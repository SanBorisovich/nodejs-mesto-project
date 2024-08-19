import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import 'dotenv/config';

import { NotFoundError, ServerError } from './errors';

import { AuthContext } from './types';
import router from './routes';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response<unknown, AuthContext>, next: NextFunction) => {
  res.locals.user = {
    _id: '66c20693756ab4c7b1a52ddc',
  };

  next();
});

app.use('/', router);

app.use(express.static(path.join(__dirname, 'public')));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((
  err: ServerError | Error,
  req: unknown,
  res: Response,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const isCustomError = err instanceof ServerError;
  if (!isCustomError) {
    const customError = new ServerError();
    res
      .status(customError.statusCode)
      .send(customError.resObj);
  } else {
    res
      .status(err.statusCode)
      .send({
        statusCode: err.statusCode,
        message: err.message,
      });
  }
});

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.info('Подключение к БД выполнено успешно');
    await app.listen(PORT, () => {
      console.info('Сервер запущен успешно на порту: ', PORT);
    });
  } catch (e) {
    console.error('При запуске приложения что-то пошло не так', e);
  }
};

connect();
