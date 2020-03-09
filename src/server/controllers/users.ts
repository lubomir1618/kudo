import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import { isUserValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Users {
  public users = db.get<I.User>('users');

  public list(req: Request, res: Response) {
    utils.serverLog('/users => list', req);
    this.users
      .find()
      .then((data) => res.json(data))
      .catch((err) => utils.errorHandler(res, err.message));
  }

  public show(req: Request, res: Response) {
    let where = {};
    if (req.params.id === 'where') {
      utils.serverLog('/users/where?:key=:val => show', req);
      const [key, val] = Object.entries(req.query)[0];
      where = { [key]: val };
    } else {
      utils.serverLog('/users/:id => show', req);
      where = { _id: req.params.id };
    }
    this.users
      .findOne(where)
      .then((data) => res.json(data))
      .catch((err) => utils.errorHandler(res, err.message));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/users => create', req);
    const valid = isUserValid(req.body);
    if (valid === true) {
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
      console.log('user', user);
    } else {
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
    }
  }
}

const users = new Users();

export const cUsers = {
  create: users.create.bind(users),
  list: users.list.bind(users),
  show: users.show.bind(users)
};
