import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import { isUserValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Users {
  public users = db.get<I.User>('userslist');

  public list(req: Request, res: Response) {
    utils.serverLog('/users => list', req);
    this.users.find().then((data) => res.json(data));
  }

  public show(req: Request, res: Response) {
    utils.serverLog('/users/:id => show', req);
    this.users.findOne({ _id: req.params.id }).then((data) => res.json(data));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/users => create', req);
    const valid = isUserValid(req.body);
    if (valid === true) {
      const user: I.User = {
        created: new Date().getTime(),
        name: req.body.name,
        surname: req.body.surname
      };
      // save to db
      this.users.insert(user).then((data) => res.json(data));
      console.log('user', user);
    } else {
      res.status(422);
      res.json({ message: `Error in: ${valid.join(', ')}` });
    }
  }
}

const users = new Users();

export const cUsers = {
  create: users.create.bind(users),
  list: users.list.bind(users),
  show: users.show.bind(users)
};
