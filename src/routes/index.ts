import express, { Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import urlMappings from '../storage/urlMappings';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/url', async (req: Request, res: Response) => {
  const { url, clientId } = req.body;
  const socket = req.io;
  const shortUrlCode = crypto.randomBytes(5).toString('hex');
  const shortUrl = `${process.env.BASE_URL}:${process.env.PORT}/${shortUrlCode}`;

  urlMappings[shortUrlCode] = url;

  const emitUrl = (url: string, attempts: number = 10, timeDelay: number = 1000): Promise<void> => {
    return new Promise((resolve, reject) => {
      let attemptsLeft = attempts;

      const emitEvent = () => {
        if (attemptsLeft <= 0) {
          reject(new Error(`Failed to deliver url to client after ${attempts} attempts`));
          return;
        }

        socket.to(clientId).emit('urlShortened', url, (response: { status: string }) => {
          console.log(response);
          if (response && response.status === 'received') {
            resolve();
          } else {
            attemptsLeft -= 1;
            setTimeout(emitEvent, timeDelay);
          }
        });
      };

      emitEvent();
    });
  };

  try {
    await emitUrl(shortUrl);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  // socket.to(clientId).emit('urlShortened', shortUrl);
  // res.sendStatus(200);
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
