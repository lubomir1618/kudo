import * as I from './../../common/interfaces';

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

export function encodePassword(pass: I.UserForm['password']): string {
  return `encoded:${pass}`;
}
