import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/url', (req: Request, res: Response) => {
  console.log(req.body.url);
  res.send(req.body.url);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Received ID: ${id}`);
});

router.get('/', (_req: Request, res: Response) => {
  res.send('Send params for url shortening');
});

export default router;
