import React, { Component } from 'react';
import * as E from '../../../common/constants';
import { getCookie } from '../../utils/client';

import EventForm from '../EventForm/EventForm';
import EventList from '../EventList/EventList';
import LoginForm from '../LoginForm/LoginForm';
import UserForm from '../UserForm/UserForm';
import UserList from '../UserList/UserList';

interface IAdminState {
  authenticated: boolean;
  role: E.USER_ROLE;
}

export default class Admin extends Component<any, IAdminState> {
  private sessionCheckIntervalID: number = 0;

  constructor(props: any) {
    super(props);
    const cookie = getCookie('connect.role');

    this.state =
      cookie === false
        ? { authenticated: false, role: E.USER_ROLE.none }
        : { authenticated: true, role: cookie as E.USER_ROLE };
  }

  public componentDidMount() {
    document.addEventListener('kudoz::authenticated', ((e: CustomEvent) => {
      this.setState({
        authenticated: true,
        role: e.detail.role
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

    if (this.state.role === E.USER_ROLE.admin) {
      jsx.push(<UserForm key="userForm" />);
      jsx.push(<UserList key="userList" />);
    }

    if (this.state.role === E.USER_ROLE.admin || this.state.role === E.USER_ROLE.user) {
      jsx.push(<EventForm key="eventForm" />);
      jsx.push(<EventList key="eventList" />);
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
    }, E.COOKIE_MAX_AGE + 1000);
  }
}
