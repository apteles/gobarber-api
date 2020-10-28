import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import configUpload from '@config/upload';
import globalHandler from '@shared/handlers/globalHandler';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(configUpload.uploadsPath));

app.use(routes);

app.use(errors());
app.use(globalHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('>>> Server running on port 3333');
});
