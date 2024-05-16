import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import logger from 'morgan';

dotenv.config();
const app = express();
app.use(logger('dev'));
app.use(express.json());

const PORT = process.env.PORT;

app.use('/', routes);

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
