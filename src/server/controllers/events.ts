import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as E from '../../common/constants';
import * as I from '../../common/interfaces';
import { isEventValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');

class Events {
  public events = db.get<I.Event>('events');

  public list(req: Request, res: Response) {
    utils.serverLog('/events => list', req);
    this.events
      .find()
      .then((data) => res.json(data))
      .catch((err) => utils.errorHandler(res, err.message));
  }

  public show(req: Request, res: Response) {
    let where = {};
    if (req.params.id === 'where') {
      utils.serverLog('/events/where?:key=:val => show', req);
      const [key, val] = Object.entries(req.query)[0];
      where = { [key]: val };
    } else {
      utils.serverLog('/events/:id => show', req);
      where = { _id: req.params.id };
    }
    try {
      this.events
        .find(where)
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    } catch (e) {
      utils.errorHandler(res, 'No such event', E.REST_ERROR.not_found);
    }
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/events => create', req);
    if (!utils.isAuthenticated(req, res)) {
      return;
    }

    const valid = isEventValid(req.body);
    if (valid === true) {
      const event: I.Event = {
        created: new Date().getTime(),
        dateFrom: Number(req.body.dateFrom),
        dateTo: Number(req.body.dateTo),
        name: req.body.name,
        state: req.body.state,
        userId: req.body.userId
      };
      // save to db
      this.events
        .insert(event)
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.bad_request));
    } else {
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
  }

  public update(req: Request, res: Response) {
    utils.serverLog('/events/:id => update', req);
    if (!utils.isAuthenticated(req, res)) {
      return;
    }

    const valid = isEventValid(req.body);
    if (valid === true) {
      const card = {
        dateFrom: Number(req.body.dateFrom),
        dateTo: Number(req.body.dateTo),
        name: req.body.name,
        state: req.body.state
      };
      // update db
      this.events
        .update({ _id: req.params.id }, { $set: { ...card } })
        .then((data) => res.json(data))
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    } else {
      utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
  }
}

const events = new Events();

export const cEvents = {
  create: events.create.bind(events),
  list: events.list.bind(events),
  show: events.show.bind(events),
  update: events.update.bind(events)
};
