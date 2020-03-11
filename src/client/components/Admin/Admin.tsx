import React, { Component } from 'react';
import * as E from '../../../common/constants';
import { getCookie } from '../../utils/client';
import { logout } from '../../utils/api';

import EventForm from '../EventForm/EventForm';
import EventList from '../EventList/EventList';
import LoginForm from '../LoginForm/LoginForm';
import PasswordForm from '../PasswordForm/PasswordForm';
import UserForm from '../UserForm/UserForm';
import UserList from '../UserList/UserList';

interface IAdminState {
  authenticated: boolean;
  role: E.USER_ROLE;
  userId: string;
}

export default class Admin extends Component<any, IAdminState> {
  private sessionCheckIntervalID: number = 0;

  constructor(props: any) {
    super(props);
    const role = getCookie('connect.role');
    const userId = getCookie('connect.userId') || '';

    this.state =
      role === false
        ? { authenticated: false, role: E.USER_ROLE.none, userId }
        : { authenticated: true, role: role as E.USER_ROLE, userId };
  }

  public componentDidMount() {
    document.addEventListener('kudoz::authenticated', ((e: CustomEvent) => {
      this.setState({
        authenticated: true,
        role: e.detail.role,
        userId: e.detail.userId
      });
      this.sessionCheck();
    }) as EventListener);
  }

  public render() {
    return (
      <div className="admin" key="admin">
        <header>
          <h1>Admin</h1>
        </header>
        {this.state.authenticated ? this.renderAdmin() : <LoginForm />}
      </div>
    );
  }

  private renderAdmin(): JSX.Element[] {
    const jsx: JSX.Element[] = [];

    jsx.push(
      <button id="admin-logout" key="logoutButton" onClick={this.onLogoutHandler.bind(this)}>
        Logout
      </button>
    );
    jsx.push(
      <button id="admin-password" key="passwordButton" onClick={this.onPasswordHandler.bind(this)}>
        Change pass
      </button>
    );
    jsx.push(<PasswordForm key="passwordForm" role={this.state.role} />);

    if (this.state.role === E.USER_ROLE.admin) {
      jsx.push(<UserForm key="userForm" />);
      jsx.push(<UserList key="userList" />);
    }

    if (this.state.role === E.USER_ROLE.admin || this.state.role === E.USER_ROLE.user) {
      jsx.push(<EventForm key="eventForm" userId={this.state.userId} />);
      jsx.push(<EventList key="eventList" userId={this.state.userId} role={this.state.role} />);
    }

    return jsx;
  }

  private sessionCheck(): void {
    this.sessionCheckIntervalID = window.setInterval(() => {
      const cookie = getCookie('connect.sid');
      if (cookie === false) {
        this.setState({ authenticated: false, role: E.USER_ROLE.none });
        window.clearInterval(this.sessionCheckIntervalID);
      }
    }, 60000);
  }

  private onLogoutHandler() {
    logout().then(() => {
      this.setState({
        authenticated: false,
        role: E.USER_ROLE.none,
        userId: ''
      });
    });
  }

  private onPasswordHandler() {
    document.dispatchEvent(new CustomEvent('kudoz::passwordFormRefresh'));
  }
}
