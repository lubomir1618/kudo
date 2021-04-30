import * as T from './constants';

// DB models
export interface Table {
  _id?: string;
  created?: number;
}

export interface Event extends Table {
  dateFrom: number;
  dateTo: number;
  name: string;
  state: T.EVENT_STATE;
  userId: string;
}

export interface NameList extends Table {
  names: string;
  userId: string;
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
  role: T.USER_ROLE;
  login: string;
  password: string;
}

// Transporting models
export interface BF_Auth {
  authenticated: boolean;
  role: T.USER_ROLE;
  userId: string | undefined;
}

export interface FB_Credentials {
  credentials: string;
}

export interface FB_UserUpdate {
  name: string;
  surname: string;
  role: T.USER_ROLE;
  login: string;
}

export interface FB_UserInsert extends FB_UserUpdate, FB_Credentials {}

// Form models
export interface User extends Table {
  name: string;
  surname: string;
  role: T.USER_ROLE;
  login: string;
  password: string;
}

export interface UserFormUpdate extends Table {
  name: string;
  surname: string;
  role: T.USER_ROLE;
  login: string;
}

export interface UserFormInsert extends UserFormUpdate, UserFormPasswords {}

export interface UserFormPasswords {
  password: string;
  passwordRepeat: string;
}

export interface PasswordForm {
  login: string;
  password: string;
  passwordOld: string;
  passwordRepeat: string;
}

export interface LoginForm {
  login: string;
  password: string;
}
