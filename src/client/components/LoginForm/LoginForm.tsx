import React, { Component } from 'react';
import * as V from '../../../common/validate';
import * as E from '../../../common/constants';
import { auth, select } from '../../utils/api';
import { encodePassword } from '../../utils/client';
import './LoginForm.css';

export default class LoginForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public onLoginHandler() {
    const info = document.getElementById('form-login-info') as HTMLDivElement;
    const form = document.getElementById('form-login-form') as HTMLFormElement;

    const formData = new FormData(form);
    const login = formData.get('login') as string;
    const plainPassword = formData.get('password') as string;

    const okAuth = V.isAuthValid({ login, password: plainPassword }, E.FORM_MODE.insert);
    if (okAuth === true) {
      select<{ salt: string }>('/api/auth', login)
        .then((data) => {
          const password = encodePassword(plainPassword, data.salt);
          return auth({ login, password });
        })
        .then((data) => {
          if (data.authenticated) {
            document.dispatchEvent(new CustomEvent('kudoz::authenticated', { detail: data }));
          } else {
            info.innerText = 'Error: authentication failed';
          }
        })
        .catch((err: Error) => {
          info.innerText = 'Error: authentication failed';
        });
    } else {
      info.innerText = `Error: ${okAuth.join(', ')}`;
      return;
    }
  }

  public render() {
    return (
      <div id="form-login" key="loginForm">
        <div className="formLogin_header">
          <span className="formLogin_header-text">Sign in</span>
        </div>
        <form id="form-login-form" autoComplete="off">
          <label htmlFor="name">Login:</label>
          <input type="text" id="login-login" name="login" placeholder="enter login" />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="login-password"
            autoComplete="new-password"
            name="password"
            placeholder="enter password"
          />
        </form>
        <input type="button" className="button-primary" onClick={this.onLoginHandler.bind(this)} value="Sign in" />
        <div id="form-login-info" />
      </div>
    );
  }
}
