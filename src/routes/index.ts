import express, { Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import urlMappings from '../storage/urlMappings';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// TODO: move to controller
router.post('/url', (req: Request, res: Response) => {
  const { url, clientId } = req.body;
  const socket = req.io;
  const shortUrlCode = crypto.randomBytes(5).toString('hex');
  const shortUrl = `${process.env.BASE_URL}:${process.env.PORT}/${shortUrlCode}`;

  urlMappings[shortUrlCode] = url;

  socket.to(clientId).emit('urlShortened', { shortUrl });

  res.send({ shortUrl, clientId });
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const savedUrl = urlMappings[id];

  if (savedUrl) {
    res.redirect(`https://${savedUrl}`);
    return;
  } else {
    res.status(404).json({ error: 'invalid short url code' });
  }
});

router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.resolve('public/index.html'));
});

export default router;
