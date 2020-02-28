import monk from 'monk';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as utils from '../utils';
import * as I from '../../common/interfaces';
import { isLikeValid } from '../../common/validate';

dotenv.config();
const DB = monk(process.env.MONGODB_URL || '');

export function cLike(req: Request, res: Response) {
  utils.serverLog('/like => like', req);

  const _id = req.body._id as string;
  const valid = isLikeValid(_id);

  if (valid !== true) {
    return utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
  }

  const events = DB.get<I.Event>('events');
  const cards = DB.get<I.Card>('cards');

  let cardData: I.Card;
  let eventData: I.Event;
  let likes: number;

  cards
    // select card because we need eventId and fresh value of likes
    .findOne({ _id })
    // select event because we need date range
    .then((data) => {
      if (data) {
        cardData = data;
      } else {
        throw new Error('No such card in DB');
      }
      return events.findOne({ _id: cardData.eventId });
    })
    // check date range to allow likes increase
    .then((data) => {
      if (data) {
        eventData = data;
      } else {
        throw new Error('No such event in DB');
      }
      const now = new Date().getTime();
      if (eventData.dateFrom <= now && now <= eventData.dateTo) {
        likes = cardData.likes + 1;
        return cards.update({ _id }, { $set: { likes } });
      } else {
        throw new Error('Can not vote for this event.');
      }
    })
    .then((data) => {
      if (data.ok === 1) {
        res.json({ likes });
        res.end();
      } else {
        throw new Error('Could not incerase likes.');
      }
    })
    .catch((err) => utils.errorHandler(res, err.message));
}
