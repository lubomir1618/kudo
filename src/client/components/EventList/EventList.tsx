import React, { Component } from 'react';
import { select } from '../../utils/api';
import * as E from '../../../common/constants';
import * as I from '../../../common/interfaces';
import KudoEvent from '../KudoEvent/KudoEvent';

interface IEventListProps {
  role: E.USER_ROLE;
  userId: string;
}

interface IEventListState extends IEventListProps {
  data: I.Event[];
  loading: boolean;
}

export default class EventList extends Component<IEventListProps, IEventListState> {
  private bind: {
    onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onListRefresh: EventListener;
  };

  constructor(props: IEventListProps) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      role: props.role,
      userId: props.userId
    };
    this.bind = {
      onClickHandler: this.onClickHandler.bind(this),
      onListRefresh: this.onListRefresh.bind(this) as EventListener
    };
  }

  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::eventListRefresh', this.bind.onListRefresh);
  }

  public componentWillUnmount() {
    document.removeEventListener('kudoz::eventListRefresh', this.bind.onListRefresh);
  }

  public render() {
    const { data, loading } = this.state;
    return (
      <section id="events_list" className="pane" key="eventList">
        <h4>
          Events
          <span className="button">
            <button className="gen_button" data-id="" onClick={this.bind.onClickHandler}>
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
    jsx.push(<td key="_id"> <a href={`${window.origin}/event/${event._id}`} target="_blank" rel="noopener noreferrer" title="link to event">
      {event._id}
      </a></td>);
    jsx.push(
      <td key="name">
        <a href={`${window.origin}/event/${event._id}`} target="_blank" rel="noopener noreferrer" title="link to event">
          {event.name}
        </a>
      </td>
    );
    jsx.push(<td key="dateFrom">{new Date(event.dateFrom).toLocaleString()}</td>);
    jsx.push(<td key="dateTo">{new Date(event.dateTo).toLocaleString()}</td>);
    jsx.push(<td key="state">{this.getEventStatus(event)}</td>);
    jsx.push(
      <td key="edit">
        <button className="gen_button" data-id={event._id} onClick={this.bind.onClickHandler}>
          <span className="icon-pencil" /> Edit
        </button>
      </td>
    );
    return jsx;
  }

  private eventRows(events: I.Event[]): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    events.forEach((event) => {
      jsx.push(<tr key={event._id} className={this.getEventStatus(event)}>{this.eventCols(event)}</tr>);
    });
    return jsx;
  }

  private getEventStatus(event: I.Event) {
    return (event.dateFrom > Date.now()
    ? E.EVENT_STATE.future
    : event.dateTo > Date.now()
      ? E.EVENT_STATE.active
      : E.EVENT_STATE.past
  );
  }
  private loading(): JSX.Element {
    return (
      <tr>
        <td colSpan={5}>Loading...</td>
      </tr>
    );
  }

  private getData() {
    const where = this.state.role === E.USER_ROLE.admin ? undefined : { userId: this.state.userId };

    select<I.Event[]>('/api/events', where).then((data) => {
      data.sort((a, b) => {
        if (a === b) {
          return 0;
        }
        return a.dateFrom < b.dateFrom ? 1 : -1
      })
      this.setState({ data, loading: false })
    });
  }

  private onClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const _id = e.currentTarget.dataset.id ?? undefined;
    document.dispatchEvent(new CustomEvent('kudoz::eventFormRefresh', { detail: { _id } }));
  }

  private onListRefresh() {
    this.setState({ loading: true });
    this.getData();
  }
}
