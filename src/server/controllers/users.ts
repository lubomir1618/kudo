import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as E from '../../common/constants';
import * as I from '../../common/interfaces';
import { isUserValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Users {
  public users = db.get<I.User>('users');

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
      .findOne(where)
      .then((data) => res.json(this.stripPass(data || [])))
      .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/users => create', req);
    if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
      return;
    }

    const valid = isUserValid(req.body, E.FORM_MODE.insert);
    if (valid === true) {
      // login duplicity check
      this.users
        .findOne({ login: req.body.login })
        .then((existingUser) => {
          if (existingUser?.login === undefined) {
            this.setUser(req, res);
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

  private setUser(req: Request, res: Response) {
    const user: I.User = {
      created: new Date().getTime(),
      login: req.body.login,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
      surname: req.body.surname
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
