import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import NodeRSA from 'node-rsa';
import bcrypt from 'bcryptjs';
import path from 'path';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import * as E from '../../common/constants';
import { isAuthValid, isPassChangeValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Auth {
  public users = db.get<I.User>('users');
  private key = new NodeRSA({ b: 256 });

  public list(rootPath: string, res: Response) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve(rootPath, 'client', 'admin.html'));
  }

  /**
   * Sends RSA public key to client, starts handshake.
   */
  public show(req: Request, res: Response) {
    utils.serverLog('/auth/:login => show', req);
    this.key.generateKeyPair(512);
    utils.setSession(req, 'privateKey', this.key.exportKey('pkcs8-private-pem'));
    res.json({ key: this.key.exportKey('pkcs8-public-pem') });
    res.end();
  }

  /**
   * Compares login and password with DB
   */
  public create(req: Request, res: Response) {
    utils.serverLog('/auth => create', req);
    const out: I.BF_Auth = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };
    let credentials: I.LoginForm;

    // Check if we started handshake
    if (req.session?.privateKey === undefined) {
      utils.setAuthCookie(req, res, out);
      utils.errorHandler(res, 'Error in handshake', E.REST_ERROR.forbidden);
      return;
    }

    // decode encrypted data
    try {
      const body = req.body as I.FB_Credentials;
      this.key.importKey(req.session?.privateKey);
      const dataBase = this.key.decrypt(body.credentials, 'base64');
      const dataJson = Buffer.from(dataBase, 'base64').toString();
      credentials = JSON.parse(dataJson);
    } catch (err) {
      const msg = (err.message as string).includes('error:04099079')
        ? '🔐 wrong or expired key used, hack ?!'
        : err.message;
      console.log(msg);
      utils.errorHandler(res, 'Authentication failed', E.REST_ERROR.forbidden);
      return;
    }

    // proceed with authentication check
    const valid = isAuthValid(credentials, E.FORM_MODE.insert);
    if (valid === true) {
      this.users
        .findOne({ login: credentials.login })
        .then((data) => {
          if (!data || !data.password) {
            throw new Error('Authentication failed');
          } else {
            const salt = data.password.substr(0, 29);
            const hash = bcrypt.hashSync(credentials.password, salt);

            if (hash === data.password) {
              out.authenticated = true;
              out.role = data.role;
              out.userId = data._id;
            }
            utils.setAuthCookie(req, res, out);
            utils.setSession(req, 'privateKey', undefined);
            return res.json(out);
          }
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
    let credentials: I.PasswordForm;
    // Check if we are authenticated
    if (!utils.isAuthenticated(req, res)) {
      return;
    }

    // Check if we started handshake
    if (req.session?.privateKey === undefined) {
      utils.errorHandler(res, 'Error in handshake', E.REST_ERROR.forbidden);
      return;
    } else {
      try {
        const body = req.body as I.FB_Credentials;
        this.key.importKey(req.session?.privateKey);
        const dataBase = this.key.decrypt(body.credentials, 'base64');
        const dataJson = Buffer.from(dataBase, 'base64').toString();
        credentials = JSON.parse(dataJson);
      } catch (err) {
        const msg = (err.message as string).includes('error:04099079')
          ? '🔐 wrong or expired key used, hack ?!'
          : err.message;
        console.log(msg);
        utils.errorHandler(res, 'Authentication failed', E.REST_ERROR.forbidden);
        return;
      }
    }

    // proceed with password change
    const isAdmin = req.session?.role === E.USER_ROLE.admin;
    const valid = isPassChangeValid(credentials, E.FORM_MODE.update, isAdmin);
    if (valid === true) {
      const login = credentials.login;
      this.users
        .findOne({ login })
        .then((data) => {
          if (data && data.login) {
            // admin can change user password without knowing old password
            if (!(isAdmin && login !== 'admin')) {
              const salt = data.password.substr(0, 29);
              const hash = bcrypt.hashSync(credentials.passwordOld, salt);
              if (hash !== data.password) {
                throw new Error('Authentication failed');
              }
            }
            const newSalt = bcrypt.genSaltSync(10);
            const newHash = bcrypt.hashSync(credentials.password, newSalt);
            return this.users.update({ login }, { $set: { password: newHash } });
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
    const out: I.BF_Auth = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };
    utils.setAuthCookie(req, res, out);
    res.end('{"result": "logged out"}');
  }
}

const auth = new Auth();

export const cAuth = {
  create: auth.create.bind(auth),
  destroy: auth.destroy.bind(auth),
  list: auth.list.bind(auth),
  show: auth.show.bind(auth),
  update: auth.update.bind(auth)
};
