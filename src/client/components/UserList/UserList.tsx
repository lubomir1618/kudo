import React, { Component } from 'react';
import { select } from '../../utils/api';
import * as I from '../../../common/interfaces';

interface IUserListState {
  data: I.User[];
  loading: boolean;
}

export default class UserList extends Component<any, IUserListState> {
  private bind: {
    onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onListRefresh: EventListener;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.bind = {
      onClickHandler: this.onClickHandler.bind(this),
      onListRefresh: this.onListRefresh.bind(this) as EventListener
    };
  }

  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::userListRefresh', this.bind.onListRefresh);
  }

  public componentWillUnmount() {
    document.removeEventListener('kudoz::userListRefresh', this.bind.onListRefresh);
  }

  public render() {
    const { data, loading } = this.state;
    return (
      <section id="users_list" className="pane" key="userList">
        <h4>
          Users
          <span className="button">
            <button className="gen_button" data-id="" onClick={this.bind.onClickHandler}>
              <span className="icon-plus" /> New user
            </button>
          </span>
        </h4>
        <table className="admin-table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>surname</th>
              <th>login</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{loading ? this.loading() : this.userRows(data)}</tbody>
        </table>
      </section>
    );
  }

  private userCols(user: I.User): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    jsx.push(<td key="_id">{user._id}</td>);
    jsx.push(<td key="name">{user.name}</td>);
    jsx.push(<td key="surname">{user.surname}</td>);
    jsx.push(<td key="login">{user.login}</td>);
    jsx.push(<td key="role">{user.role}</td>);
    jsx.push(
      <td key="edit">
        <button className="gen_button" data-id={user._id} onClick={this.bind.onClickHandler}>
          <span className="icon-pencil" />
          Edit
        </button>
      </td>
    );
    return jsx;
  }

  private userRows(users: I.User[]): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    users.forEach((user) => {
      jsx.push(<tr key={user._id}>{this.userCols(user)}</tr>);
    });
    return jsx;
  }

  private loading(): JSX.Element {
    return (
      <tr>
        <td colSpan={5}>Loading...</td>
      </tr>
    );
  }

  private getData() {
    select<I.User[]>('/api/users').then((data) => this.setState({ data, loading: false }));
  }

  private onClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const _id = e.currentTarget.dataset.id ?? undefined;
    document.dispatchEvent(new CustomEvent('kudoz::userFormRefresh', { detail: { _id } }));
  }

  private onListRefresh() {
    this.setState({ loading: true });
    this.getData();
  }
}
