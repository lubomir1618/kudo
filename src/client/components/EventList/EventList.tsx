import React, { Component } from 'react';
import { select } from '../../utils/api';
import * as I from '../../../common/interfaces';

interface IEventListState {
  data: I.Event[];
  loading: boolean;
}

export default class EventList extends Component<any, IEventListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::eventListRefresh', () => {
      this.setState({ loading: true });
      this.getData();
    });
  }

  public getData() {
    select<I.Event[]>('/api/events').then((data) => this.setState({ data, loading: false }));
  }

  public onClickHandler(e: React.MouseEvent<HTMLInputElement>) {
    const _id = e.currentTarget.dataset.id;
    document.dispatchEvent(new CustomEvent('kudoz::eventFormRefresh', { detail: { _id } }));
  }

  public render() {
    const { data, loading } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>dateFrom</th>
            <th>dateTo</th>
            <th>state</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{loading ? this.loading() : this.eventRows(data)}</tbody>
      </table>
    );
  }

  private eventCols(event: I.Event): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    jsx.push(<td>{event.name}</td>);
    jsx.push(<td>{new Date(event.dateFrom).toLocaleString()}</td>);
    jsx.push(<td>{new Date(event.dateTo).toLocaleString()}</td>);
    jsx.push(<td>{event.state}</td>);
    jsx.push(
      <td>
        <input type="button" data-id={event._id} value="edit" onClick={this.onClickHandler.bind(this)} />
      </td>
    );
    return jsx;
  }

  private eventRows(events: I.Event[]): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    events.forEach((event) => {
      jsx.push(<tr>{this.eventCols(event)}</tr>);
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
