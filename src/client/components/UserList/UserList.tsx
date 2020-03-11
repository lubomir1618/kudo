import React, { Component } from 'react';
import { select } from '../../utils/api';
import * as I from '../../../common/interfaces';

interface IUserListState {
  data: I.User[];
  loading: boolean;
}

export default class UserList extends Component<any, IUserListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::userListRefresh', () => {
      this.setState({ loading: true });
      this.getData();
    });
  }

  public getData() {
    select<I.User[]>('/api/users').then((data) => this.setState({ data, loading: false }));
  }

  public onClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const _id = e.currentTarget.dataset.id ?? undefined;
    document.dispatchEvent(new CustomEvent('kudoz::userFormRefresh', { detail: { _id } }));
  }

  public render() {
    const { data, loading } = this.state;
    return (
      <section id="users_list" className="pane" key="userList">
        <h4>
          Users
          <span className="button">
            <button className="gen_button" data-id="" onClick={this.onClickHandler.bind(this)}>
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
        <button className="gen_button" data-id={user._id} onClick={this.onClickHandler.bind(this)}>
          <span className="icon-pencil"/>Edit
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
}
