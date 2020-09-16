import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import 'reflect-metadata';
import './database';
import configUpload from './config/upload';
import globalHanlder from './handlers/globalHanlder';

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
