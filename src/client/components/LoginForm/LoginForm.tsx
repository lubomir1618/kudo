import React, { Component } from 'react';
import * as V from '../../../common/validate';
import * as E from '../../../common/constants';
import * as I from '../../../common/interfaces';
import { auth, select } from '../../utils/api';
import { encryptCredentials } from '../../utils/client';

export default class LoginForm extends Component<any, any> {
  private bind: {
    onLoginHandler: (e: React.FormEvent) => void;
  };

  constructor(props: any) {
    super(props);
    this.bind = {
      onLoginHandler: this.onLoginHandler.bind(this)
    };
  }

  public render() {
    return (
      <div id="form-login" key="loginForm" className="form-window">
        <div className="form-window_header">
          <span className="form-window_header-text">Sign in</span>
          <span className="form-window_header-close icon-remove-sign" />
        </div>
        <form id="form-login-form" className="pane_form" autoComplete="off" onSubmit={this.bind.onLoginHandler}>
          <div className="form_row">
            <label htmlFor="name">Login:</label>
            <input type="text" name="login" placeholder="enter login" />
          </div>
          <div className="form_row">
            <label htmlFor="password">Password: </label>
            <input type="password" autoComplete="new-password" name="password" placeholder="enter password" />
          </div>
          <div className="form_row -right">
            <button className="gen_button" onClick={this.bind.onLoginHandler}>
              <span className="icon-circle-arrow-right" /> Sign in
            </button>
          </div>
        </form>
        <div id="form-login-info" className="form-window_footer">
          &nbsp;
        </div>
      </div>
    );
  }

  private onLoginHandler(e: React.FormEvent) {
    e.preventDefault();

    const info = document.getElementById('form-login-info') as HTMLDivElement;
    const form = document.getElementById('form-login-form') as HTMLFormElement;

    const formData = new FormData(form);
    const rawData: I.LoginForm = {
      login: formData.get('login') as string,
      password: formData.get('password') as string
    };

    const okAuth = V.isAuthValid(rawData, E.FORM_MODE.insert);
    if (okAuth === true) {
      select<{ key: string }>('/api/auth', 'login')
        .then((data) => {
          const credentials = encryptCredentials<I.LoginForm>(rawData, data.key);
          return auth({ credentials });
        })
        .then((data) => {
          if (data.authenticated) {
            document.dispatchEvent(new CustomEvent('kudoz::authenticated', { detail: data }));
          } else {
            info.innerText = 'Error: authentication failed';
          }
        })
        .catch((_e) => {
          info.innerText = 'Error: authentication failed';
        });
    } else {
      info.innerText = `Error: ${okAuth.join(', ')}`;
      return;
    }
  }
}
