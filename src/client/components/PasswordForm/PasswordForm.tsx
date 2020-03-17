import React, { Component } from 'react';
import * as I from '../../../common/interfaces';
import * as E from '../../../common/constants';
import * as V from '../../../common/validate';
import { select, update } from '../../utils/api';
import { encryptCredentials } from '../../utils/client';

interface IPasswordFormProps {
  role: E.USER_ROLE;
}

interface IPasswordFormState {
  isAdmin: boolean;
  mode: E.FORM_MODE;
}

export default class PasswordForm extends Component<IPasswordFormProps, IPasswordFormState> {
  private readonly newPass: I.PasswordForm;
  private bind: {
    onClickHandler: (e: React.FormEvent) => void;
    onClose: () => void;
    onFormRefresh: EventListener;
  };

  constructor(props: IPasswordFormProps) {
    super(props);
    this.newPass = {
      login: '',
      password: '',
      passwordOld: '',
      passwordRepeat: ''
    };
    this.state = {
      isAdmin: props.role === E.USER_ROLE.admin,
      mode: E.FORM_MODE.hidden
    };
    this.bind = {
      onClickHandler: this.onClickHandler.bind(this),
      onClose: this.onClose.bind(this),
      onFormRefresh: this.onFormRefresh.bind(this) as EventListener
    };
  }

  public componentDidMount(): void {
    document.addEventListener('kudoz::passwordFormRefresh', this.bind.onFormRefresh);
  }

  public componentWillUnmount() {
    document.removeEventListener('kudoz::passwordFormRefresh', this.bind.onFormRefresh);
  }

  public render(): JSX.Element {
    const { login, password, passwordOld, passwordRepeat } = this.newPass;
    const classHidden = this.state.mode === E.FORM_MODE.hidden ? ' hidden' : '';

    return (
      <div id="form-password" key="passwordForm" className={`form-window${classHidden}`}>
        <div className="form-window_header">
          <span className="form-window_header-text">Password change</span>
          <span className="form-window_header-close icon-remove-sign" onClick={this.bind.onClose} />
        </div>
        <form id="form-password-form" className="pane_form" autoComplete="off" onSubmit={this.bind.onClickHandler}>
          <div className="form_row">
            <label htmlFor="login">Login: </label>
            <input type="text" name="login" placeholder="enter your login" defaultValue={login} /> *
          </div>
          <div className="form_row">
            <label htmlFor="password">Old password: </label>
            <input
              type="password"
              autoComplete="old-password"
              name="passwordOld"
              placeholder="enter old password"
              defaultValue={passwordOld}
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
              defaultValue={password}
            />{' '}
            *
          </div>
          <div className="form_row">
            <label htmlFor="passwordRepeat">Repeat new password: </label>
            <input
              type="password"
              name="passwordRepeat"
              placeholder="repeat new password"
              defaultValue={passwordRepeat}
            />{' '}
            *
          </div>
          <div className="form_row -right">
            <button className="gen_button" onClick={this.bind.onClickHandler}>
              <span className="icon-key" /> Change password
            </button>
          </div>
        </form>
        <div id="form-password-info" className="form-window_footer">
          &nbsp;
        </div>
      </div>
    );
  }

  private onClickHandler(e: React.FormEvent): void {
    e.preventDefault();

    const rawData: I.PasswordForm = { ...this.newPass };
    const info = document.getElementById('form-password-info') as HTMLDivElement;
    const form = document.getElementById('form-password-form') as HTMLFormElement;
    const formData = new FormData(form);
    formData.forEach((item, key) => {
      (rawData[key as keyof I.PasswordForm] as any) = item;
    });

    const okPass = V.isPassChangeValid(rawData, E.FORM_MODE.insert, this.state.isAdmin);
    if (okPass === true) {
      select<{ key: string }>('/api/auth', 'chpass')
        .then((data) => {
          delete rawData.passwordRepeat;
          const credentials = encryptCredentials<I.PasswordForm>(rawData, data.key);
          return update('/api/auth', 'change', { credentials });
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

  private onClose(): void {
    const form = document.getElementById('form-password-form') as HTMLFormElement;
    form.reset();
    this.setState({ mode: E.FORM_MODE.hidden });
  }

  private onFormRefresh(): void {
    const info = document.getElementById('form-password-info') as HTMLDivElement;
    info.innerText = ' ';
    this.setState({ mode: E.FORM_MODE.insert });
  }
}
