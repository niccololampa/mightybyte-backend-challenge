import express, { Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';

const router = express.Router();

router.post('/url', (req: Request, res: Response) => {
  console.log(req.body.url);

  const { _url, clientId } = req.body;
  const shortUrlCode = crypto.randomBytes(5).toString('hex');
  const socket = req.io;

  socket.to(clientId).emit('urlShortened', { shortUrlCode });

  res.send({ shortUrlCode, clientId });
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Received ID: ${id}`);
});

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.resolve('public/index.html'));
});

export default router;
