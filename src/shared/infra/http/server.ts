import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import configUpload from '@config/upload';
import globalHandler from '@shared/handlers/globalHandler';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(configUpload.tempPath));

app.use(routes);

app.use(errors());
app.use(globalHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('>>> Server running on port 3333');
});
