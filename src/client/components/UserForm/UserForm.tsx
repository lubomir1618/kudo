import React, { Component } from 'react';
import * as I from '../../../common/interfaces';
import * as E from '../../../common/constants';
import * as V from '../../../common/validate';
import { insert, select, update } from '../../utils/api';
import { encodePassword } from '../../utils/client';

interface IUserFormState {
  user: I.User;
  mode: E.FORM_MODE;
}

export default class UserForm extends Component<any, IUserFormState> {
  private readonly newUser: I.UserForm;
  private bind: {
    onClickHandler: (e: React.FormEvent) => void;
    onClose: () => void;
    onFormRefresh: EventListener;
  };

  constructor(props: any) {
    super(props);

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
      user: { ...this.newUser }
    };
    this.bind = {
      onClickHandler: this.onClickHandler.bind(this),
      onClose: this.onClose.bind(this),
      onFormRefresh: this.onFormRefresh.bind(this) as EventListener
    };
  }

  public componentDidMount(): void {
    document.addEventListener('kudoz::userFormRefresh', this.bind.onFormRefresh);
  }

  public componentWillUnmount() {
    document.removeEventListener('kudoz::userFormRefresh', this.bind.onFormRefresh);
  }

  public render(): JSX.Element {
    const { name, surname, login, role } = this.state.user;
    const button = `${this.state.mode === E.FORM_MODE.insert ? 'Create' : 'Update'} user`;
    const classHidden = this.state.mode === E.FORM_MODE.hidden ? ' hidden' : '';

    return (
      <div id="form-user" key="userForm" className={`form-window${classHidden}`}>
        <div className="form-window_header">
          <span className="form-window_header-text">User</span>
          <span className="form-window_header-close icon-remove-sign" onClick={this.bind.onClose} />
        </div>
        <form id="form-user-form" className="pane_form" autoComplete="off" onSubmit={this.bind.onClickHandler}>
          <div className="form_row">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" defaultValue={name} />
          </div>
          <div className="form_row">
            <label htmlFor="surname">Surname:</label>
            <input type="text" name="surname" defaultValue={surname} />
          </div>
          <div className="form_row">
            <label htmlFor="role">Role: </label>
            <select name="role" defaultValue={role}>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
            *
          </div>
          <div className="form_row">
            <label htmlFor="login">Login: </label>
            <input type="text" name="login" defaultValue={login} /> *
          </div>
          {this.state.mode === E.FORM_MODE.insert ? this.passRows() : ''}
          <div className="form_row -right">
            <button className="gen_button" onClick={this.bind.onClickHandler}>
              <span className="icon-user" /> {button}
            </button>
          </div>
        </form>
        <div id="form-user-info" className="form-window_footer">
          &nbsp;
        </div>
      </div>
    );
  }

  private passRows(): JSX.Element {
    return (
      <div>
        <div className="form_row">
          <label htmlFor="password">Password: </label>
          <input type="password" autoComplete="new-password" name="password" placeholder="enter password" /> *
        </div>
        <div className="form_row">
          <label htmlFor="passwordRepeat">Password repeat: </label>
          <input type="password" name="passwordRepeat" placeholder="repeat password" /> *
        </div>
      </div>
    );
  }

  private onClickHandler(e: React.FormEvent): void {
    e.preventDefault();

    const rawData: I.UserForm = { ...this.newUser };
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
    const okUser = V.isUserValid(data, this.state.mode);
    if (okUser !== true) {
      info.innerText = `Error: ${okUser.join(', ')}`;
      return;
    }

    this.setData(data);
  }

  private onClose(): void {
    const form = document.getElementById('form-user-form') as HTMLFormElement;
    form.reset();
    this.setState({ mode: E.FORM_MODE.hidden });
  }

  private getData(_id?: string): void {
    if (_id) {
      select<I.User[]>('/api/users', _id).then((data) => {
        const user = data[0];
        this.setState({ user, mode: E.FORM_MODE.update });
      });
    } else {
      this.setState({ user: { ...this.newUser }, mode: E.FORM_MODE.insert });
    }
  }

  private setData(data: I.User): void {
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

  private onFormRefresh(e: CustomEvent) {
    const info = document.getElementById('form-user-info') as HTMLDivElement;
    info.innerText = ' ';
    this.getData(e.detail._id);
  }
}
