export interface Event {
  _id: number;
  active: boolean;
  date: number;
  name: string;
}

export interface Card {
  _id?: number;
  author: string;
  date: number;
  eventId: number;
  likes: number;
  name: string;
  text: string;
}

export interface Admin {
  _id: number;
  user: string;
  pass: string;
}

export interface User {
  _id?: number;
  created: Date;
  name: string;
  surname: string;
}
