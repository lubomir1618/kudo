import * as I from './interfaces';

export function isUserValid(user: I.User) {
  return user.name && user.name !== '' && user.surname && user.surname !== '';
}
