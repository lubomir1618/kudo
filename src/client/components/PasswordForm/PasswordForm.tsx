import React, { Component } from 'react';
import * as I from '../../../common/interfaces';
import * as E from '../../../common/constants';
import * as V from '../../../common/validate';
import { select, update } from '../../utils/api';
import { encodePassword } from '../../utils/client';

interface IPasswordFormProps {
  role: E.USER_ROLE;
}

interface IPasswordFormState {
  isAdmin: boolean;
  mode: E.FORM_MODE;
}

export default class PasswordForm extends Component<IPasswordFormProps, IPasswordFormState> {
  constructor(props: IPasswordFormProps) {
    super(props);
    this.state = {
      isAdmin: props.role === E.USER_ROLE.admin,
      mode: E.FORM_MODE.hidden
    };
  }

  public componentDidMount(): void {
    document.addEventListener('kudoz::passwordFormRefresh', ((e: CustomEvent) => {
      const info = document.getElementById('form-password-info') as HTMLDivElement;
      info.innerText = ' ';
      this.setState({ mode: E.FORM_MODE.insert });
    }) as EventListener);
  }

  public render(): JSX.Element {
    const classHidden = this.state.mode === E.FORM_MODE.hidden ? ' hidden' : '';
    return (
      <div id="form-password" key="passwordForm" className={`form-window${classHidden}`}>
        <div className="form-window_header">
          <span className="form-window_header-text">Password change</span>
          <span className="form-window_header-close icon-remove-sign" onClick={this.close.bind(this)} />
        </div>
        <form id="form-password-form" className="pane_form" autoComplete="off" onSubmit={this.onClickHandler.bind(this)}>
          <div className="form_row">
            <label htmlFor="login">Login: </label>
            <input type="text" name="login" placeholder="enter your login" /> *
          </div>
          <div className="form_row">
            <label htmlFor="password">Old password: </label>
            <input
              type="password"
              autoComplete="old-password"
              name="passwordOld"
              placeholder="enter old password"
            />
            {this.state.isAdmin ? ' ' : ' *'}
          </div>
          <div className="form_row">
            <label htmlFor="password">New password: </label>
            <input
              type="password"
              autoComplete="new-password"
              name="password"
              placeholder="enter new password"
            />{' '}
            *
          </div>
          <div className="form_row">
            <label htmlFor="passwordRepeat">Repeat new password: </label>
            <input type="password" name="passwordRepeat" placeholder="repeat new password" /> *
          </div>
          <div className="form_row -right">
            <button className="gen_button" onClick={this.onClickHandler.bind(this)}>
              <span className="icon-key" /> Change password
            </button>
          </div>
        </form>
        <div id="form-password-info" className="form-window_footer">&nbsp;</div>
      </div>
    );
  }

  private onClickHandler(e: React.FormEvent): void {
    e.preventDefault();

    const rawData: I.PasswordForm = {
      login: '',
      password: '',
      passwordOld: '',
      passwordRepeat: ''
    };
    const info = document.getElementById('form-password-info') as HTMLDivElement;
    const form = document.getElementById('form-password-form') as HTMLFormElement;
    const formData = new FormData(form);
    formData.forEach((item, key) => {
      (rawData[key as keyof I.PasswordForm] as any) = item;
    });

    const okPass = V.isPassChangeValid(rawData, E.FORM_MODE.insert, this.state.isAdmin);
    if (okPass === true) {
      select<{ salt: string }>('/api/auth', rawData.login)
        .then((data) => {
          const passData = {
            login: rawData.login,
            password: encodePassword(rawData.password),
            passwordOld: encodePassword(rawData.passwordOld, data.salt)
          };
          return update('/api/auth', 'change', passData);
        })
        .then(() => {
          info.innerText = 'Success: Password changed';
        })
        .catch(() => {
          info.innerText = 'Error: Password change failed';
        });
    } else {
      info.innerText = 'Error: Passwords does not match.';
    }
  }

  private close(): void {
    this.setState({ mode: E.FORM_MODE.hidden });
  }
}
