import monk from 'monk';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import dotenv from 'dotenv';

dotenv.config();

const db = monk(process.env.MONGODB_URL || '');
class Cards {
  public cards = db.get<I.Card>('cards');

  public list(req: Request, res: Response) {
    utils.serverLog('/card => list', req);
    this.cards.find().then((data) => res.json(data));
  }

  public show(req: Request, res: Response) {
    utils.serverLog('/card/:id => show', req);
    this.cards.findOne({ _id: req.params.id }).then((data) => res.json(data));
  }

  public create(req: Request, res: Response) {
    utils.serverLog('/card => create', req);
    if (this.isValid(req.body)) {
      const card = {
        author: req.body.author,
        date: new Date(),
        eventId: Number(req.body.eventId),
        likes: Number(req.body.likes),
        name: req.body.name,
        text: req.body.text
      };
      // save to db
      this.cards.insert(card).then((data) => res.json(data));
    } else {
      res.status(422);
      res.json({ message: 'Name and surname must be fulfilled!' });
    }
  }

  private isValid(data: I.Card) {
    return data.name && data.name.toString() !== '';
  }
}

const cards = new Cards();

export const cCards = {
  create: cards.create.bind(cards),
  list: cards.list.bind(cards),
  show: cards.show.bind(cards)
};