import * as I from './interfaces';

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

  if (!(event.date && event.date !== '')) {
    bugs.push('date');
  }
  if (!(event.name && event.name !== '')) {
    bugs.push('name');
  }
  if (!(event.state && ['past', 'active', 'future'].includes(event.state))) {
    bugs.push('state');
  }

  return bugs.length ? bugs : true;
}
