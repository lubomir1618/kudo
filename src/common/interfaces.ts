import * as T from './constants';

export interface Event {
  _id?: string;
  created?: number;
  dateFrom: number;
  dateTo: number;
  name: string;
  state: T.EVENT_STATE;
}

export interface Card {
  _id: string;
  author?: string;
  awardedTo: string;
  created?: number;
  eventId: string;
  likes: number;
  text: string;
  title: string;
  type: T.CARD_TYPE;
}

export interface Admin {
  _id?: string;
  user: string;
  pass: string;
}

export interface User {
  _id?: string;
  created?: number;
  name: string;
  surname: string;
}
