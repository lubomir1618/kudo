import NodeRSA from 'node-rsa';
import * as I from '../../common/interfaces';

interface IkudoNum {
  name: string;
  count: number;
}
interface IkudoObj {
  [key: string]: IkudoNum;
}

export function getKudoNumberList(cards: I.Card[]): IkudoNum[] {
  /* Count (points system) is awarded as 1 card = 1 point, 1 like = 1 point. so Kudo knight with
  ** one card and 3 likes is more than somebody with 3 cards and no likes
  */
  const list = cards.reduce((acc: IkudoObj, val: I.Card) => {
    if (acc[val.awardedTo]) {
      acc[val.awardedTo].count += 1;
      acc[val.awardedTo].count += val.likes;
    } else {
      acc[val.awardedTo] = { count: 1 + val.likes, name: val.awardedTo };
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

export function encryptCredentials<T>(data: T, publicKey: string): string {
  const key = new NodeRSA();
  key.importKey(publicKey);
  const hash = key.encrypt(JSON.stringify(data), 'base64');
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
