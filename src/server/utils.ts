import { Request, Response } from 'express';

export function serverLog(text: string, req: Request) {
  console.log(
    `${req.method} ${text}, ` +
      `query: ${JSON.stringify(req.query)}, ` +
      `params: ${JSON.stringify(req.params)}, ` +
      `body: ${JSON.stringify(req.body)}`
  );
}

export function errorHandler(res: Response, message: string) {
  console.log(`💥 Error: ${message}`);
  res.status(422);
  res.json({ message });
  res.end();
}
