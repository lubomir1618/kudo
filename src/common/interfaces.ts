import * as T from './constants';

export interface Table {
  _id?: string;
  created?: number;
}

export interface Event extends Table {
  dateFrom: number;
  dateTo: number;
  name: string;
  state: T.EVENT_STATE;
}

export interface Card extends Table {
  awardedTo: string;
  created: number;
  eventId: string;
  likes: number;
  text: string;
  type: T.CARD_TYPE;
}

export interface User extends Table {
  name: string;
  surname: string;
  login: string;
  password: string;
  role: T.USER_ROLE;
}

export interface UserForm extends User {
  passwordRepeat: string;
}

export interface Auth {
  authenticated: boolean;
  role: T.USER_ROLE;
}
