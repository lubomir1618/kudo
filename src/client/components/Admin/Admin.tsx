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

  public componentDidUpdate() {
    const pane = document.getElementById('events_list');
    if (pane) {
      pane.style.display = 'block';
      // pane.style.visibility = 'visible';
    }
  }

  public render() {
    return (
      <div className="admin" key="admin">
        {this.state.authenticated ? this.renderAdmin() : <LoginForm />}
      </div>
    );
  }

  private renderAdmin(): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    const isUser = this.state.role === E.USER_ROLE.user || this.state.role === E.USER_ROLE.admin;
    const isAdmin = this.state.role === E.USER_ROLE.admin;

    jsx.push(
      <div className="admin_buttons" key="adminButtons">
        <button id="admin-logout" className="gen_button" key="logoutButton" onClick={this.onLogoutHandler.bind(this)}>
          <span className="icon-power-off" /> Sign out
        </button>
        <button
          id="admin-password"
          className="gen_button"
          key="passwordButton"
          onClick={this.onPasswordHandler.bind(this)}>
            <span className="icon-key" /> Change pass
        </button>
      </div>
    );

    jsx.push(
      <section className="admin_forms" key="adminForms">
        <PasswordForm key="passwordForm" role={this.state.role} />
        {isUser && <EventForm key="eventForm" userId={this.state.userId} />}
        {isAdmin && <UserForm key="userForm" />}
      </section>
    );

    jsx.push(
      <main key="adminMain">
        <header>
          <h2>Admin</h2>
          <nav>
            <ul id="tabs" className="tabrow">
              {isUser && (
                <li className="selected" data-pane="events_list" onClick={this.onTabsHandler.bind(this)}>
                  <span className="icon-calendar"></span> Events
                </li>
              )}
              {isAdmin && (
                <li data-pane="users_list" onClick={this.onTabsHandler.bind(this)}>
                  <span className="icon-group"></span> Users
                </li>
              )}
            </ul>
          </nav>
        </header>
        <article>
          {isUser && <EventList key="eventsList" userId={this.state.userId} role={this.state.role} />}
          {isAdmin && <UserList key="usersList" />}
        </article>
      </main>
    );

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

  private onTabsHandler(e: React.MouseEvent<HTMLLIElement>) {
    const tabEl = e.currentTarget;
    const pane = document.getElementById(tabEl.dataset.pane as string);
    if (pane) {
      for (const el of document.querySelectorAll<HTMLElement>('.pane')) {
        el.style.display = 'none';
        // el.style.visibility = 'hidden';
      }
      pane.style.display = 'block';
      // pane.style.visibility = 'visible';
      for (const el of document.querySelectorAll<HTMLLIElement>('li')) {
        el.classList.remove('selected');
      }
      tabEl.classList.add('selected');
    }
  }

  private onPasswordHandler() {
    document.dispatchEvent(new CustomEvent('kudoz::passwordFormRefresh'));
  }
}
