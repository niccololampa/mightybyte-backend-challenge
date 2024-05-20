import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import logger from 'morgan';
import { createServer } from 'http';
import cors from 'cors';

import socketConnection from './sockets';

dotenv.config();
const app = express();
const server = createServer(app);
const io = socketConnection(server);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

const PORT = process.env.PORT;
// middleware to attach socket.io to the request to be available for routes controllers.
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/', routes);

server
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
