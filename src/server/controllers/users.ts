import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import NodeRSA from 'node-rsa';
import bcrypt from 'bcryptjs';
import * as utils from '../utils';
import * as E from '../../common/constants';
import * as I from '../../common/interfaces';
import { isUserValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Users {
  public users = db.get<I.User>('users');
  private key = new NodeRSA({ b: 256 });

  public list(req: Request, res: Response) {
    utils.serverLog('/users => list', req);
    if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
      return;
    }

    this.users
      .find()
      .then((data) => res.json(this.stripPass(data)))
      .catch((err) => utils.errorHandler(res, err.message));
  }

  public show(req: Request, res: Response) {
    utils.serverLog(req.params.id === 'where' ? '/users/where?:key=:val => show' : '/users => create', req);
    if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
      return;
    }

    let where = {};
    if (req.params.id === 'where') {
      const [key, val] = Object.entries(req.query)[0];
      where = { [key]: val };
    } else {
      where = { _id: req.params.id };
    }
    this.users
      .find(where)
      .then((data) => res.json(this.stripPass(data || [])))
      .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/users => create', req);
    if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
      return;
    }
    let credentials: I.UserFormPasswords;

    // Check if we started handshake
    if (req.session?.privateKey === undefined) {
      utils.errorHandler(res, 'Error in handshake', E.REST_ERROR.forbidden);
      return;
    }

    // decode encrypted data
    try {
      const body = req.body as I.FB_UserInsert;
      this.key.importKey(req.session?.privateKey);
      const dataBase = this.key.decrypt(body.credentials, 'base64');
      const dataJson = Buffer.from(dataBase, 'base64').toString();
      credentials = JSON.parse(dataJson);
    } catch (err) {
      const msg = (err.message as string).includes('error:04099079')
        ? '🔐 wrong or expired key used, hack ?!'
        : err.message;
      console.log(msg);
      utils.errorHandler(res, 'Error in received data.', E.REST_ERROR.bad_request);
      return;
    }

    const rawData = { ...req.body, password: credentials.password } as I.UserFormInsert;
    const valid = isUserValid(rawData, E.FORM_MODE.insert);
    if (valid === true) {
      // login duplicity check
      this.users
        .findOne({ login: rawData.login })
        .then((existingUser) => {
          if (existingUser?.login === undefined) {
            this.setUser(res, rawData);
          } else {
            utils.errorHandler(res, 'Duplicate user', E.REST_ERROR.bad_request);
          }
        })
        .catch((err) => utils.errorHandler(res, err.message));
    } else {
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
  }

  public update(req: Request, res: Response) {
    utils.serverLog('/users/:id => update', req);
    if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
      return;
    }

    const valid = isUserValid(req.body, E.FORM_MODE.update);
    if (valid === true) {
      const user = {
        login: req.body.login,
        name: req.body.name,
        role: req.body.role,
        surname: req.body.surname
      };
      // update db
      this.users
        .update({ _id: req.params.id }, { $set: { ...user } })
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    } else {
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
  }

  private setUser(res: Response, rawData: I.UserFormInsert) {
    const newSalt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(rawData.password, newSalt);
    const user: I.User = {
      created: new Date().getTime(),
      login: rawData.login,
      name: rawData.name,
      password,
      role: rawData.role,
      surname: rawData.surname
    };
    // save to db
    this.users
      .insert(user)
      .then((data) => res.json(data))
      .catch((err) => utils.errorHandler(res, err.message));
  }

  private stripPass(data: I.User | I.User[]): I.User | I.User[] {
    const myData = Array.isArray(data) ? data : [data];
    const out: I.User[] = myData.map((user) => {
      const password = '👮‍♂️';
      return { ...user, password };
    });
    return Array.isArray(data) ? out : out[0];
  }
}

const users = new Users();

export const cUsers = {
  create: users.create.bind(users),
  list: users.list.bind(users),
  show: users.show.bind(users),
  update: users.update.bind(users)
};
