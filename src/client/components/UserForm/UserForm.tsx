import React, { Component } from 'react';
import * as V from '../../../common/validate';
import { insert, select, update } from '../../utils/api';
import { encodePassword } from '../../utils/client';
import * as I from '../../../common/interfaces';
import * as E from '../../../common/constants';
import './UserForm.css';

import bcrypt from 'bcryptjs';

interface IUserFormState {
  user: I.User;
  mode: E.FORM_MODE;
}

export default class UserForm extends Component<any, IUserFormState> {
  private newUser: I.UserForm;

  constructor(props: any) {
    super(props);

    (window as any).bcrypt = bcrypt;

    this.newUser = {
      login: '',
      name: '',
      password: '',
      passwordRepeat: '',
      role: E.USER_ROLE.user,
      surname: ''
    };
    this.state = {
      mode: E.FORM_MODE.hidden,
      user: this.newUser
    };
  }

  private test() {
    const pass = 'qwerty1';
    const hash = '$2a$10$10puYBADjAlfjHFeo3gbCe3aIzKN2R2G6.ZNuK.NjNs81wyUdXaji';
    const info = document.getElementById('form-user-info') as HTMLDivElement;
    bcrypt
      .compare(pass, hash)
      .then((res) => {
        info.innerText = res ? 'Pass ok' : 'Pass bad';
      })
      .catch((err) => {
        info.innerText = 'Pass check error';
      });
  }

  public onClickHandler() {
    const rawData: I.UserForm = this.newUser;
    const info = document.getElementById('form-user-info') as HTMLDivElement;
    const form = document.getElementById('form-user-form') as HTMLFormElement;
    const formData = new FormData(form);
    let data: I.User;

    formData.forEach((item, key) => {
      (rawData[key as keyof I.UserForm] as any) = item;
    });

    // validate passwords
    if (this.state.mode === E.FORM_MODE.insert) {
      const okPass = V.isPasswordValid(rawData);
      if (okPass === true) {
        const password = encodePassword(rawData.password);
        delete rawData.passwordRepeat;
        data = { ...rawData, password };
      } else {
        info.innerText = 'Error: Passwords does not match.';
        return;
      }
    } else {
      data = { ...rawData };
    }

    // validate form
    const okUser = V.isUserValid(data);
    if (okUser !== true) {
      info.innerText = `Error: ${okUser.join(', ')}`;
      return;
    }

    this.setData(data);
  }

  public componentDidMount() {
    document.addEventListener('kudoz::userFormRefresh', ((e: CustomEvent) => {
      const info = document.getElementById('form-user-info') as HTMLDivElement;
      info.innerText = '';
      this.getData(e.detail._id);
    }) as EventListener);
  }

  public getData(_id?: string) {
    if (_id) {
      select<I.User>('/api/users', _id).then((user) => this.setState({ user, mode: E.FORM_MODE.update }));
    } else {
      this.setState({ user: this.newUser, mode: E.FORM_MODE.insert });
    }
  }

  public close() {
    this.setState({ mode: E.FORM_MODE.hidden });
  }

  public render() {
    const { name, surname, login, password, role } = this.state.user;
    const button = `${this.state.mode === E.FORM_MODE.insert ? 'Create' : 'Update'} user 🙍‍♂️`;
    const classHidden = this.state.mode === E.FORM_MODE.hidden ? 'hidden' : '';

    return (
      <div id="form-user" key="userForm" className={classHidden}>
        <div className="formUser_header">
          <span className="formUser_header-text">User</span>
          <span className="formUser_header-close" onClick={this.close.bind(this)}>
            x
          </span>
        </div>
        <form id="form-user-form" autoComplete="off">
          <label htmlFor="name">Name:</label>
          <input type="text" id="user-name" name="name" defaultValue={name} />
          <br />
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="user-surname" name="surname" defaultValue={surname} />
          <br />
          <label htmlFor="role">Role: </label>
          <select id="user-role" name="role" defaultValue={role}>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
          *
          <br />
          <label htmlFor="login">Login: </label>
          <input type="text" id="user-login" name="login" defaultValue={login} /> *
          <br />
          {this.state.mode === E.FORM_MODE.insert ? (
            this.passRows()
          ) : (
            <input type="hidden" id="user-password" name="password" defaultValue={password} />
          )}
          <input type="button" className="button-primary" onClick={this.onClickHandler.bind(this)} value={button} />
          <input type="button" onClick={this.test.bind(this)} value="Test" />
          <div id="form-user-info" />
        </form>
      </div>
    );
  }

  private passRows() {
    return (
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="user-password"
          autoComplete="new-password"
          name="password"
          placeholder="enter password"
        />{' '}
        *
        <br />
        <label htmlFor="passwordRepeat">Password repeat: </label>
        <input type="password" id="user-password-repeat" name="passwordRepeat" placeholder="repeat password" /> *
        <br />
      </div>
    );
  }

  private setData(data: I.User) {
    const info = document.getElementById('form-user-info') as HTMLDivElement;

    if (this.state.mode === E.FORM_MODE.insert) {
      insert<I.User>('/api/users', data)
        .then(() => {
          info.innerText = 'Success: User added.';
          document.dispatchEvent(new CustomEvent('kudoz::userListRefresh'));
        })
        .catch((err: Error) => {
          info.innerText = `Error: ${err.message}`;
        });
    } else {
      update<I.User>('/api/users', this.state.user._id as string, data)
        .then(() => {
          info.innerText = 'Success: User updated.';
          document.dispatchEvent(new CustomEvent('kudoz::userListRefresh'));
        })
        .catch((err: Error) => {
          info.innerText = `Error: ${err.message}`;
        });
    }
  }
}
