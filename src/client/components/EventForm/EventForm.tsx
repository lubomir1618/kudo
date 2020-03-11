import React, { Component } from 'react';
import { insert, select, update } from '../../utils/api';
import * as I from '../../../common/interfaces';
import * as E from '../../../common/constants';

interface IEventFormProps {
  userId: string;
}

interface IEventFormState extends IEventFormProps {
  event: I.Event;
  mode: 'hidden' | 'insert' | 'update';
}

export default class EventForm extends Component<IEventFormProps, IEventFormState> {
  private newEvent: I.Event;

  constructor(props: IEventFormProps) {
    super(props);

    const now = new Date().getTime();
    this.newEvent = {
      dateFrom: now,
      dateTo: now + 1209600000,
      name: '',
      state: E.EVENT_STATE.future,
      userId: props.userId
    };
    this.state = {
      event: this.newEvent,
      mode: 'hidden',
      userId: props.userId
    };
  }

  public onClickHandler(e: React.FormEvent) {
    e.preventDefault();

    const data: I.Event = this.newEvent;
    const info = document.getElementById('form-event-info') as HTMLDivElement;
    const form = document.getElementById('form-event-form') as HTMLFormElement;
    const formData = new FormData(form);
    formData.forEach((item, key) => {
      (data[key as keyof I.Event] as any) = item;
    });

    if (this.state.mode === 'insert') {
      insert<I.Event>('/api/events', data)
        .then(() => {
          info.innerText = 'Success: Event added.';
          document.dispatchEvent(new CustomEvent('kudoz::eventListRefresh'));
        })
        .catch((err: Error) => {
          info.innerText = `Error: ${err.message}`;
        });
    } else {
      update<I.Event>('/api/events', this.state.event._id as string, data)
        .then(() => {
          info.innerText = 'Success: Event updated.';
          document.dispatchEvent(new CustomEvent('kudoz::eventListRefresh'));
        })
        .catch((err: Error) => {
          info.innerText = `Error: ${err.message}`;
        });
    }
  }

  public componentDidMount() {
    document.addEventListener('kudoz::eventFormRefresh', ((e: CustomEvent) => {
      const info = document.getElementById('form-event-info') as HTMLDivElement;
      info.innerText = ' ';
      this.getData(e.detail._id);
    }) as EventListener);
  }

  public getData(_id?: string) {
    if (_id) {
      select<I.Event[]>('/api/events', _id).then((data) => {
        const event = data[0];
        this.setState({ event, mode: E.FORM_MODE.update })
      });
    } else {
      this.setState({ event: this.newEvent, mode: 'insert' });
    }
  }

  public close() {
    this.setState({ mode: 'hidden' });
  }

  public render() {
    const { dateFrom, dateTo, name, state, userId } = this.state.event;
    const button = `${this.state.mode === 'insert' ? 'Create' : 'Update'} event`;
    const classHidden = this.state.mode === 'hidden' ? ' hidden' : '';

    return (
      <div id="form-event" key="eventForm" className={`form-window${classHidden}`}>
        <div className="form-window_header">
          <span className="form-window_header-text">Event</span>
          <span className="form-window_header-close icon-remove-sign" onClick={this.close.bind(this)} />
        </div>
        <form id="form-event-form" className="pane_form" autoComplete="off" onSubmit={this.onClickHandler.bind(this)}>
          <input type="hidden" name="userId" defaultValue={userId} />
          <div className="form_row">
            <label htmlFor="dateFrom">Date from: </label>
            <input type="text" name="dateFrom" defaultValue={dateFrom} /> *
          </div>
          <div className="form_row">
            <label htmlFor="dateTo">Date to: </label>
            <input type="text" name="dateTo" defaultValue={dateTo} /> *
          </div>
          <div className="form_row">
            <label htmlFor="name">Event name: </label>
            <input type="text" name="name" placeholder="event name" defaultValue={name} /> *
          </div>
          <div className="form_row">
            <label htmlFor="state">State: </label>
            <select id="event-state" name="state" defaultValue={state}>
              <option value="past">past</option>
              <option value="active">active</option>
              <option value="future">future</option>
            </select>
            *
          </div>
          <div className="form_row -right">
            <button className="gen_button" onClick={this.onClickHandler.bind(this)}>
              <span className="icon-calendar" />{button}
            </button> 
          </div>
        </form>
        <div id="form-event-info" className="form-window_footer">&nbsp;</div>
      </div>
    );
  }
}
