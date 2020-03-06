import * as I from '../../common/interfaces';
import { isUserValid } from '../../common/validate';
import { insert, select } from './api';
import { Card } from './../../common/interfaces';

const form = document.getElementById('form-user') as HTMLFormElement;
const loading = document.querySelector('.loading') as HTMLImageElement;
const API_URL = '/api/users';
const usersElement = document.querySelector('.allUsers') as HTMLDivElement;

export function vodka() {
  loading.style.display = 'none';
  listAllUsers();

  form.addEventListener('submit', (event) => {
    const formData = new FormData(form);
    const name = formData.get('name')?.toString() || '';
    const surname = formData.get('surname')?.toString() || '';

    const user: I.User = {
      name,
      surname
    };

    if (!isUserValid(user)) {
      return false;
    }

    console.log('user', user);

    form.style.display = 'none';
    loading.style.display = '';

    insert<I.User>('/api/users', user)
      .then((createdUser) => {
        form.style.display = '';
        loading.style.display = 'none';
        form.reset();
        listAllUsers();
        console.log(createdUser);
      })
      .catch((err: Error) => {
        console.error(`💥 Error: ${err.message}`);
      });

    event.preventDefault();
  });

  function listAllUsers() {
    select<I.User[]>('/api/users')
      .then((users) => {
        usersElement.textContent = '';
        users.reverse();

        users.forEach((user) => {
          const div = document.createElement('div');
          const header = document.createElement('h4');
          const surname = document.createElement('p');
          const created = document.createElement('small');

          header.textContent = user.name;
          surname.textContent = user.surname;
          created.textContent = new Date(user.created as number).toString();

          div.appendChild(header);
          div.appendChild(surname);
          div.appendChild(created);

          usersElement.appendChild(div);
        });
      })
      .catch((err: Error) => {
        console.error(`💥 Error: ${err.message}`);
      });
  }
}

interface IkudoNum {
  name: string;
  count: number;
}
interface IkudoObj {
  [key: string]: IkudoNum;
}

export function getKudoNumberList(cards: Card[]): IkudoNum[] {
  const list = cards.reduce((acc: IkudoObj, val: Card) => {
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
