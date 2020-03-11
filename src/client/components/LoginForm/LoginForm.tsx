import React, { Component } from 'react';
import * as V from '../../../common/validate';
import * as E from '../../../common/constants';
import { auth, select } from '../../utils/api';
import { encodePassword } from '../../utils/client';

export default class LoginForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public onLoginHandler(e: React.FormEvent) {
    e.preventDefault();

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
      <div id="form-login" key="loginForm" className="form-window">
        <div className="form-window_header">
          <span className="form-window_header-text">Sign in</span>
          <span className="form-window_header-close icon-remove-sign" />
        </div>
        <form id="form-login-form" className="pane_form" autoComplete="off" onSubmit={this.onLoginHandler.bind(this)}>
          <div className="form_row">
            <label htmlFor="name">Login:</label>
            <input type="text" name="login" placeholder="enter login" />
          </div>
          <div className="form_row">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              autoComplete="new-password"
              name="password"
              placeholder="enter password"
            />
          </div>
          <div className="form_row -right">
            <button className="gen_button" onClick={this.onLoginHandler.bind(this)}>
              <span className="icon-circle-arrow-right" /> Sign in
            </button>
          </div>
        </form>
        <div id="form-login-info" className="form-window_footer">&nbsp;</div>
      </div>
    );
  }
}
