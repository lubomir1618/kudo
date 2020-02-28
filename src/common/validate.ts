import * as I from './interfaces';

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

export function isCardValid(card: I.Card) {
  const bugs: string[] = [];

  if (!(card.awardedTo && card.awardedTo !== '')) {
    bugs.push('awardedTo');
  }
  if (!(card.eventId && card.eventId !== '')) {
    bugs.push('eventId');
  }
  if (!(card.title && card.title !== '')) {
    bugs.push('title');
  }
  if (!(card.text && card.text !== '')) {
    bugs.push('text');
  }
  if (!(card.type && ['awesome', 'normal'].includes(card.type))) {
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
