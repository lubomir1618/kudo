import { Request, Response } from 'express';
import * as E from '../common/constants';
import * as I from '../common/interfaces';

export const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 180000;

export function serverLog(text: string, req: Request) {
  console.log(
    `${req.method} ${text}, ` +
      `query: ${JSON.stringify(req.query)}, ` +
      `params: ${JSON.stringify(req.params)}, ` +
      `body: ${JSON.stringify(req.body)}`
  );
}

export function errorHandler(res: Response, message: string, code: E.REST_ERROR = E.REST_ERROR.unprocessable) {
  console.log(`💥 ${code} Error: ${message}`);
  res.status(code);
  res.json({ message });
  res.end();
}

export function setSession(req: Request, key: string, val: any) {
  if (req.session) {
    req.session[key] = val;
  }
}

export function setAuthCookie(req: Request, res: Response, data: I.Auth): void {
  setSession(req, 'authenticated', data.authenticated);
  setSession(req, 'role', data.role);
  if (data.authenticated) {
    res.cookie('connect.role', data.role, {
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE
    });
    res.cookie('connect.userId', data.userId, {
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE
    });
  } else {
    res.clearCookie('connect.role');
    res.clearCookie('connect.userId');
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
    errorHandler(res, `Not authenticated`, E.REST_ERROR.forbidden);
  }
  return ok;
}
