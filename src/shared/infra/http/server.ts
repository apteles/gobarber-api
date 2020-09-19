import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'reflect-metadata';
import '@shared/infra/typeorm';
import configUpload from '@config/upload';
import globalHanlder from '@shared/handlers/globalHanlder';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(configUpload.tempPath));

app.use(routes);

app.use(globalHanlder);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('>>> Server running on port 3333');
});
