import { Request, Response } from 'express';
import * as E from '../common/constants';

export const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 60000;

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

export function setSession(req: Request, key: string, val: any) {
  if (req.session) {
    req.session[key] = val;
  }
}

export function setAuthCookie(req: Request, res: Response, authenticated: boolean, role: E.USER_ROLE): void {
  setSession(req, 'authenticated', authenticated);
  setSession(req, 'role', role);
  if (authenticated) {
    res.cookie('connect.role', role, {
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE
    });
  } else {
    res.clearCookie('connect.role');
  }
}

export function isAuthenticated(req: Request, res: Response, role?: E.USER_ROLE): boolean {
  let ok = false;
  if (req.session) {
    ok = req.session.authenticated === true;
    if (role) {
      ok = ok && req.session.role === role;
    }
  }
  if (!ok) {
    errorHandler(res, `Error: not authenticated`);
  }
  return ok;
}
