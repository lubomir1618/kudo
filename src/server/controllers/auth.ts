import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import * as E from '../../common/constants';
import { isAuthValid, isPassChangeValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Auth {
  public users = db.get<I.User>('users');

  /**
   * Retrieves salt for user password encoding
   */
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
      .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.unauthorized));
  }

  /**
   * Compares login and password with DB
   */
  public create(req: Request, res: Response) {
    utils.serverLog('/auth => create', req);
    const valid = isAuthValid(req.body, E.FORM_MODE.insert);
    const out: I.Auth = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };

    if (valid === true) {
      const where = { login: req.body.login, password: req.body.password };
      this.users
        .findOne(where)
        .then((data) => {
          if (data && data.login) {
            out.authenticated = true;
            out.role = data.role;
            out.userId = data._id;
          }
          utils.setAuthCookie(req, res, out);
          return res.json(out);
        })
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.forbidden));
    } else {
      utils.setAuthCookie(req, res, out);
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
  }

  /**
   * Password change
   */
  public update(req: Request, res: Response) {
    utils.serverLog('/auth/:id => update', req);
    if (!utils.isAuthenticated(req, res)) {
      return;
    }
    const isAdmin = req.session?.role === E.USER_ROLE.admin;
    const valid = isPassChangeValid(req.body, E.FORM_MODE.update, isAdmin);
    if (valid === true) {
      const login = req.body.login;
      const where = { login, password: req.body.passwordOld };
      // admin can change user password without knowing old password
      if (isAdmin && login !== 'admin') {
        delete where.password;
      }
      this.users
        .findOne(where)
        .then((data) => {
          if (data && data.login) {
            return this.users.update({ login }, { $set: { password: req.body.password } });
          } else {
            throw new Error('Authentication failed');
          }
        })
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    } else {
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
  }

  /**
   * Log out session
   */
  public destroy(req: Request, res: Response) {
    utils.serverLog('/auth => destroy', req);
    const out: I.Auth = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };
    utils.setAuthCookie(req, res, out);
    res.end('{"result": "logged out"}');
  }
}

const auth = new Auth();

export const cAuth = {
  create: auth.create.bind(auth),
  destroy: auth.destroy.bind(auth),
  show: auth.show.bind(auth),
  update: auth.update.bind(auth)
};
