import * as I from './interfaces';
import { CARD_TYPE } from './constants';

export function hasData(data: any, type = 'string'): boolean {
  if (data === undefined || data === null) {
    return false;
  }
  switch (type) {
    case 'number':
      return typeof data === 'number' || !isNaN(data);
    case 'boolean':
      return typeof data === 'boolean';
    default:
      return data !== '';
  }
}

export function hasOneOf(data: string, check: string[]): boolean {
  if (hasData(data)) {
    return check.includes(data);
  }
  return false;
}

export function isLikeValid(_id: string) {
  return hasData(_id) ? true : ['_id'];
}

export function isUserValid(user: I.User) {
  const bugs: string[] = [];

  if (!(user.name && user.name !== '')) {
    bugs.push('name');
  }
  if (!(user.surname && user.surname !== '')) {
    bugs.push('surname');
  }

  return bugs.length ? bugs : true;
}

export function isCardValid(card: I.Card, event: I.Event | undefined) {
  const bugs: string[] = [];

  if (!(event && String(event._id) === card.eventId && event.dateFrom < card.created && event.dateTo > card.created)) {
    bugs.push('created');
  }
  if (!(card.awardedTo && card.awardedTo !== '')) {
    bugs.push('awardedTo');
  }
  if (!(card.eventId && card.eventId !== '')) {
    bugs.push('eventId');
  }
  if (!(card.text && card.text !== '')) {
    bugs.push('text');
  }
  if (!(card.type && CARD_TYPE[card.type])) {
    bugs.push('type');
  }

  return bugs.length ? bugs : true;
}

export function isEventValid(event: I.Event) {
  const bugs: string[] = [];

  if (!hasData(event.dateFrom, 'number')) {
    bugs.push('dateFrom');
  }
  if (!hasData(event.dateTo, 'number')) {
    bugs.push('dateTo');
  }
  if (!hasData(event.name)) {
    bugs.push('name');
  }
  if (!hasOneOf(event.state, ['past', 'active', 'future'])) {
    bugs.push('state');
  }

  return bugs.length ? bugs : true;
}
