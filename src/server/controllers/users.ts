import monk from 'monk';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../interfaces';

const db = monk('mongodb+srv://oeirtoeriu:ndjnmdekehfehre2019@cluster0-8sxhu.mongodb.net/test');

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
    if (this.isUserValid(req.body)) {
      const user: I.User = {
        created: new Date(),
        name: req.body.name.toString(),
        surname: req.body.surname.toString()
      };
      // save to db
      this.users.insert(user).then((data) => res.json(data));
      console.log('user', user);
    } else {
      res.status(422);
      res.json({ message: 'Name and surname must be fulfilled!' });
    }
  }

  private isUserValid(user: I.User) {
    return user.name && user.name.toString() !== '' && user.surname && user.surname.toString() !== '';
  }
}

const users = new Users();

export const cUsers = {
  create: users.create.bind(users),
  list: users.list.bind(users),
  show: users.show.bind(users)
};
