import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import { isCardValid } from '../../common/validate';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');
class Cards {
  public cards = db.get<I.Card>('cards');

  public list(req: Request, res: Response) {
    utils.serverLog('/cards => list', req);
    this.cards.find().then((data) => res.json(data));
  }

  public show(req: Request, res: Response) {
    let where = {};
    if (req.params.id === 'where') {
      utils.serverLog('/cards/where?:key=:val => show', req);
      const [key, val] = Object.entries(req.query)[0];
      where = { [key]: val };
    } else {
      utils.serverLog('/cards/:id => show', req);
      where = { _id: req.params.id };
    }
    this.cards.findOne(where).then((data) => res.json(data));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/cards => create', req);
    const valid = isCardValid(req.body);
    if (valid === true) {
      const card = {
        author: req.body.author || 'anonymous',
        awardedTo: req.body.awardedTo,
        created: new Date().getTime(),
        eventId: req.body.eventId,
        likes: 0,
        text: req.body.text,
        title: req.body.title,
        type: req.body.type
      };
      // save to db
      this.cards.insert(card).then((data) => res.json(data));
    } else {
      res.status(422);
      res.json({ message: `Error in: ${valid.join(', ')}` });
    }
  }
}

const cards = new Cards();

export const cCards = {
  create: cards.create.bind(cards),
  list: cards.list.bind(cards),
  show: cards.show.bind(cards)
};
