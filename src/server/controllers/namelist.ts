import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as E from '../../common/constants';
import * as I from '../../common/interfaces';
import { isEventValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class NameLists {
  public nameLists = db.get<I.NameList>('namelist');

  public list(req: Request, res: Response) {
    utils.serverLog('/events => list', req);
    this.nameLists
      .find()
      .then((data) => res.json(data))
      .catch((err) => utils.errorHandler(res, err.message));
  }

  public show(req: Request, res: Response) {
    let where = {};
    if (req.params.id === 'where') {
      utils.serverLog('/namelist/where?:key=:val => show', req);
      const [key, val] = Object.entries(req.query)[0];
      where = { [key]: val };
    } else {
      utils.serverLog('/namelist/:id => show', req);
      where = { _id: req.params.id };
    }
    try {
      this.nameLists
        .find(where)
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    } catch (e) {
      utils.errorHandler(res, 'No namelist', E.REST_ERROR.not_found);
    }
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/events => create', req);
    if (!utils.isAuthenticated(req, res)) {
      return;
    }

    const valid = true; //isEventValid(req.body);
    if (valid === true) {
      const namelist: I.NameList = {
        created: new Date().getTime(),
        names: req.body.names,
        userId: req.body.userId
      };
      // save to db
      this.nameLists
        .insert(namelist)
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.bad_request));
    } else {
      utils.errorHandler(res, `Error in: validity of namelist`, E.REST_ERROR.bad_request);
    }
  }

  public update(req: Request, res: Response) {
    utils.serverLog('/namelist/:id => update', req);
    if (!utils.isAuthenticated(req, res)) {
      return;
    }

    const valid = true; //isEventValid(req.body);
    if (valid === true) {
      const names = {
        names: req.body.names
      };
      // update db
      this.nameLists
        .update({ _id: req.params.id }, { $set: { ...names } })
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    } else {
      utils.errorHandler(res, `Error in: validity of namelist`, E.REST_ERROR.bad_request);
    }
  }
}

const userNameList = new NameLists();

export const cUserNameList = {
  create: userNameList.create.bind(userNameList),
  list: userNameList.list.bind(userNameList),
  show: userNameList.show.bind(userNameList),
  update: userNameList.update.bind(userNameList)
};
