import * as I from './../../common/interfaces';
import bcrypt from 'bcryptjs';

interface IkudoNum {
  name: string;
  count: number;
}
interface IkudoObj {
  [key: string]: IkudoNum;
}

export function getKudoNumberList(cards: I.Card[]): IkudoNum[] {
  const list = cards.reduce((acc: IkudoObj, val: I.Card) => {
    if (acc[val.awardedTo]) {
      acc[val.awardedTo].count += 1;
    } else {
      acc[val.awardedTo] = { name: val.awardedTo, count: 1 };
    }
    return acc;
  }, {});

  return Object.values(list).sort((a: any, b: any) => (a.count > b.count ? -1 : 1));
}

export function getKudoKnight(kudoNumList: IkudoNum[]): string {
  const winner = kudoNumList.shift();
  if (winner) {
    return winner.name;
  }
  return 'No knight yet';
}

export function soundTurnedOn() {
  const data = localStorage.getItem('kudosSettings');
  if (data) {
    const soundSetting = JSON.parse(data);

    if (soundSetting && soundSetting.sound === 'on') {
      return true;
    }
  }

  return false;
}

export function encodePassword(pass: I.UserForm['password'], salt?: string): string {
  const mySalt = salt || bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, mySalt);
  return hash;
}

export function getCookie(cname: string): string | false {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  // tslint:disable:prefer-for-of
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}
