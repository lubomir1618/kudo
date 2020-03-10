import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import * as E from '../../common/constants';
import { isAuthValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Auth {
  public users = db.get<I.User>('users');

  public show(req: Request, res: Response) {
    utils.serverLog('/auth/:login => show', req);
    const where = { login: req.params.id };

    this.users
      .findOne(where)
      .then((data) => {
        if (!data || !data.password) {
          throw new Error('Authentication failed');
        } else {
          const salt = data.password.substr(0, 29);
          return res.json({ salt });
        }
      })
      .catch((err) => utils.errorHandler(res, err.message));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/auth => create', req);
    const valid = isAuthValid(req.body, E.FORM_MODE.insert);
    if (valid === true) {
      const where = { login: req.body.login, password: req.body.password };
      this.users
        .findOne(where)
        .then((data) => {
          let out: I.Auth;
          if (!data || !data.login) {
            utils.setAuthCookie(req, res, false, E.USER_ROLE.none);
            out = { authenticated: false, role: E.USER_ROLE.none };
          } else {
            utils.setAuthCookie(req, res, true, data.role);
            out = { authenticated: true, role: data.role };
          }
          return res.json(out);
        })
        .catch((err) => utils.errorHandler(res, err.message));
    } else {
      utils.setAuthCookie(req, res, false, E.USER_ROLE.none);
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
    }
  }
}

const users = new Auth();

export const cAuth = {
  create: users.create.bind(users),
  show: users.show.bind(users)
};
