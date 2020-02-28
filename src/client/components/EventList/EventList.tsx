import React, { Component } from 'react';
import { select } from '../../utils/api';
import * as I from '../../../common/interfaces';

interface EventListState {
  data: I.Event[];
  loading: boolean;
}

export default class EventList extends Component<any, EventListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  public componentDidMount() {
    select<I.Event[]>('/api/events').then((data) => this.setState({ data, loading: false }));
  }

  public eventCols(event: I.Event): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    jsx.push(<td>{event.name}</td>);
    jsx.push(<td>{new Date(event.dateFrom).toLocaleString()}</td>);
    jsx.push(<td>{new Date(event.dateTo).toLocaleString()}</td>);
    jsx.push(<td>{event.state}</td>);
    jsx.push(
      <td>
        <input type="button" data-id={event._id} value="edit" />
      </td>
    );
    return jsx;
  }

  public eventRows(events: I.Event[]): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    events.forEach((event) => {
      jsx.push(<tr>{this.eventCols(event)}</tr>);
    });
    return jsx;
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
        <tbody>{loading ? 'Loading...' : this.eventRows(data)}</tbody>
      </table>
    );
  }
}
