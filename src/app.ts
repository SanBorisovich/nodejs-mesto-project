import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import router from './routes';
import {
  errorMiddleware,
  errorLoggerMiddleware,
  requestLoggerMiddleware,
} from './middlewares';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);
app.use('/', router);

app.use(errorLoggerMiddleware);
// тут перехватываем ошибки, которые нигде не обработались
app.use(errorMiddleware);

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
