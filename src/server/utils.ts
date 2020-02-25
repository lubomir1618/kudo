import { Request } from 'express';

export function serverLog(text: string, req: Request) {
  console.log(
    `${req.method} ${text}, ` +
      `query: ${JSON.stringify(req.query)}, ` +
      `params: ${JSON.stringify(req.params)}, ` +
      `body: ${JSON.stringify(req.body)}`
  );
}
