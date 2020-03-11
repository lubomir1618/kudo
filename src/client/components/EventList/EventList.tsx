import React, { Component } from 'react';
import { select } from '../../utils/api';
import * as E from '../../../common/constants';
import * as I from '../../../common/interfaces';

interface IEventListProps {
  role: E.USER_ROLE;
  userId: string;
}

interface IEventListState extends IEventListProps {
  data: I.Event[];
  loading: boolean;
}

export default class EventList extends Component<IEventListProps, IEventListState> {
  constructor(props: IEventListProps) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      role: props.role,
      userId: props.userId
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
    const where = this.state.role === E.USER_ROLE.admin ? undefined : { userId: this.state.userId };

    select<I.Event[]>('/api/events', where).then((data) => this.setState({ data, loading: false }));
  }

  public onClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const _id = e.currentTarget.dataset.id ?? undefined;
    document.dispatchEvent(new CustomEvent('kudoz::eventFormRefresh', { detail: { _id } }));
  }

  public render() {
    const { data, loading } = this.state;
    return (
      <section id="events_list" className="pane" key="eventList">
        <h4>
          Events
          <span className="button">
            <button className="gen_button" data-id="" onClick={this.onClickHandler.bind(this)}>
              <span className="icon-plus" /> New event
            </button>
          </span>
        </h4>
        <table className="admin-table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>dateFrom</th>
              <th>dateTo</th>
              <th>state</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{loading ? this.loading() : this.eventRows(data)}</tbody>
        </table>
      </section>
    );
  }

  private eventCols(event: I.Event): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    jsx.push(<td key="_id">{event._id}</td>);
    jsx.push(
      <td key="name">
        <a href={`${window.origin}/event/${event._id}`} target="_blank" title="link to event">
          {event.name}
        </a>
      </td>
    );
    jsx.push(<td key="dateFrom">{new Date(event.dateFrom).toLocaleString()}</td>);
    jsx.push(<td key="dateTo">{new Date(event.dateTo).toLocaleString()}</td>);
    jsx.push(<td key="state">{event.state}</td>);
    jsx.push(
      <td key="edit">
        <button className="gen_button" data-id={event._id} onClick={this.onClickHandler.bind(this)}>
          <span className="icon-pencil"/> Edit
        </button>
      </td>
    );
    return jsx;
  }

  private eventRows(events: I.Event[]): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    events.forEach((event) => {
      jsx.push(<tr key={event._id}>{this.eventCols(event)}</tr>);
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
