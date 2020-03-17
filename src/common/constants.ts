export const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 180000;

export enum CARD_TYPE {
  great_job = 'great_job',
  totally_awesome = 'totally_awesome',
  well_done = 'well_done',
  many_thanks = 'many_thanks',
  very_happy = 'very_happy',
  congrats = 'congrats',
  proud = 'proud',
  thank_you = 'thank_you'
}

export enum EVENT_STATE {
  past = 'past',
  active = 'active',
  future = 'future'
}

export enum USER_ROLE {
  admin = 'admin',
  user = 'user',
  none = 'none'
}

export enum FORM_MODE {
  hidden = 'hidden',
  insert = 'insert',
  update = 'update'
}

export enum REST_ERROR {
  bad_request = 400,
  unauthorized = 401,
  forbidden = 403,
  not_found = 404,
  unprocessable = 422
}
