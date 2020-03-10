import React, { Component } from 'react';
import * as E from '../../../common/constants';
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
  constructor(props: any) {
    super(props);
    // @TODO check session
    this.state = {
      authenticated: false,
      role: E.USER_ROLE.none
    };
  }

  public componentDidMount() {
    document.addEventListener('kudoz::authenticated', ((e: CustomEvent) => {
      this.setState({
        authenticated: true,
        role: e.detail.role
      });
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
}
