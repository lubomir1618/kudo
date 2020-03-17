import * as I from './interfaces';
import * as E from './constants';

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

export function isSame(original: string, copy: string): boolean {
  return original === copy;
}

export function isLikeValid(_id: string) {
  return hasData(_id) ? true : ['_id'];
}

export function isUserValid(user: I.User, mode: E.FORM_MODE) {
  let bugs: string[] = [];
  const authValid = isAuthValid(user, mode);

  if (authValid !== true) {
    bugs = authValid;
  }
  if (!hasData(user.name)) {
    bugs.push('name');
  }
  if (!hasData(user.surname)) {
    bugs.push('surname');
  }
  if (!(user.role && E.USER_ROLE[user.role])) {
    bugs.push('role');
  }

  return bugs.length ? bugs : true;
}

export function isAuthValid(user: I.LoginForm, mode: E.FORM_MODE) {
  const bugs: string[] = [];

  if (!hasData(user.login)) {
    bugs.push('login');
  }
  if (mode === E.FORM_MODE.insert) {
    if (!hasData(user.password)) {
      bugs.push('password');
    }
  }

  return bugs.length ? bugs : true;
}

export function isPassChangeValid(user: I.PasswordForm, mode = E.FORM_MODE.insert, isAdmin = false) {
  let bugs: string[] = [];

  if (mode === E.FORM_MODE.insert) {
    const passValid = isPasswordValid(user as any);
    if (passValid !== true) {
      bugs = passValid;
    }
  } else {
    if (!hasData(user.password)) {
      bugs.push('password');
    }
  }
  if (!hasData(user.login)) {
    bugs.push('login');
  }
  if (isAdmin === false) {
    if (!hasData(user.passwordOld)) {
      bugs.push('passwordOld');
    }
  }

  return bugs.length ? bugs : true;
}

export function isPasswordValid(user: I.UserFormPasswords) {
  const bugs: string[] = [];

  if (!hasData(user.password)) {
    bugs.push('password');
  }
  if (!hasData(user.passwordRepeat)) {
    bugs.push('paswordRepeat');
  }
  if (!isSame(user.password as string, user.passwordRepeat as string)) {
    bugs.push('paswordRepeat');
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
  if (!(card.type && E.CARD_TYPE[card.type])) {
    bugs.push('type');
  }

  return bugs.length ? bugs : true;
}

export function isEventValid(event: I.Event) {
  const bugs: string[] = [];
  let dates = 2;

  if (!hasData(event.dateFrom, 'number')) {
    dates--;
    bugs.push('dateFrom');
  }
  if (!hasData(event.dateTo, 'number')) {
    dates--;
    bugs.push('dateTo');
  }
  if (dates === 2) {
    if (Number(event.dateFrom) >= Number(event.dateTo)) {
      bugs.push('dateFrom');
      bugs.push('dateTo');
    }
  }
  if (!hasData(event.name)) {
    bugs.push('name');
  }
  if (!(event.state && E.EVENT_STATE[event.state])) {
    bugs.push('state');
  }
  if (!hasData(event.userId)) {
    bugs.push('userId');
  }

  return bugs.length ? bugs : true;
}
