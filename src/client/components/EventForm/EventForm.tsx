import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { insert, select, update } from '../../utils/api';
import * as I from '../../../common/interfaces';
import * as E from '../../../common/constants';
import * as V from '../../../common/validate';

interface IEventFormProps {
  userId: string;
}

interface IEventFormState extends IEventFormProps {
  event: I.Event;
  mode: 'hidden' | 'insert' | 'update';
}

export default class EventForm extends Component<IEventFormProps, IEventFormState> {
  private readonly newEvent: I.Event;
  private bind: {
    onClickHandler: (e: React.FormEvent) => void;
    onClose: () => void;
    onDateFrom: (date: Date | Date[]) => void;
    onDateTo: (date: Date | Date[]) => void;
    onFormRefresh: EventListener;
  };

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
      event: { ...this.newEvent },
      mode: 'hidden',
      userId: props.userId
    };
    this.bind = {
      onClickHandler: this.onClickHandler.bind(this),
      onClose: this.onClose.bind(this),
      onDateFrom: this.onDateFrom.bind(this),
      onDateTo: this.onDateTo.bind(this),
      onFormRefresh: this.onFormRefresh.bind(this) as EventListener
    };
  }

  public componentDidMount(): void {
    document.addEventListener('kudoz::eventFormRefresh', this.bind.onFormRefresh);
  }

  public componentWillUnmount() {
    document.removeEventListener('kudoz::eventFormRefresh', this.bind.onFormRefresh);
  }

  public render(): JSX.Element {
    const { dateFrom, dateTo, name, state, userId } = this.state.event;
    const button = `${this.state.mode === 'insert' ? 'Create' : 'Update'} event`;
    const classHidden = this.state.mode === 'hidden' ? ' hidden' : '';

    return (
      <div id="form-event" key="eventForm" className={`form-window${classHidden}`}>
        <div className="form-window_header">
          <span className="form-window_header-text">Event</span>
          <span className="form-window_header-close icon-remove-sign" onClick={this.bind.onClose} />
        </div>
        <form id="form-event-form" className="pane_form" autoComplete="off" onSubmit={this.bind.onClickHandler}>
          <input type="hidden" name="userId" defaultValue={userId} />
          <div className="form_row">
            <label htmlFor="dateFrom">Date from: </label>
            <DatePicker onChange={this.bind.onDateFrom} value={new Date(dateFrom)} clearIcon={null} />
            <input type="hidden" name="dateFrom" defaultValue={dateFrom} /> *
          </div>
          <div className="form_row">
            <label htmlFor="dateTo">Date to: </label>
            <DatePicker onChange={this.bind.onDateTo} value={new Date(dateTo)} clearIcon={null} />
            <input type="hidden" name="dateTo" defaultValue={dateTo} /> *
          </div>
          <div className="form_row">
            <label htmlFor="name">Event name: </label>
            <input type="text" name="name" placeholder="event name" defaultValue={name} /> *
          </div>
          <div className="form_row" style={{display: 'none'}}>
            <label htmlFor="state">State: </label>
            <select id="event-state" name="state" defaultValue={state}>
              <option value="past">past</option>
              <option value="active">active</option>
              <option value="future">future</option>
            </select>
            *
          </div>
          <div className="form_row -right">
            <button className="gen_button" onClick={this.bind.onClickHandler}>
              <span className="icon-calendar" />
              {button}
            </button>
          </div>
        </form>
        <div id="form-event-info" className="form-window_footer">
          &nbsp;
        </div>
      </div>
    );
  }

  private getData(_id?: string): void {
    if (_id) {
      select<I.Event[]>('/api/events', _id).then((data) => {
        const event = data[0];
        this.setState({ event, mode: E.FORM_MODE.update });
      });
    } else {
      this.setState({ event: { ...this.newEvent }, mode: 'insert' });
    }
  }

  private onDateFrom(date: Date | Date[]): void {
    const myDate = Array.isArray(date) ? date[0] : date;
    const event = this.state.event;
    event.dateFrom = myDate.getTime();
    this.setState({ event });
  }

  private onDateTo(date: Date | Date[]): void {
    const myDate = Array.isArray(date) ? date[0] : date;
    const event = this.state.event;
    event.dateTo = myDate.getTime();
    this.setState({ event });
  }

  private onClickHandler(e: React.FormEvent): void {
    e.preventDefault();

    const data: I.Event = { ...this.newEvent };
    const info = document.getElementById('form-event-info') as HTMLDivElement;
    const form = document.getElementById('form-event-form') as HTMLFormElement;
    const formData = new FormData(form);
    formData.forEach((item, key) => {
      (data[key as keyof I.Event] as any) = item;
    });

    const okEvent = V.isEventValid(data);
    if (okEvent === true) {
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
    } else {
      info.innerText = `Error: ${okEvent.join(', ')}`;
    }
  }

  private onClose(): void {
    const form = document.getElementById('form-event-form') as HTMLFormElement;
    form.reset();
    this.setState({ mode: 'hidden' });
  }

  private onFormRefresh(e: CustomEvent) {
    const info = document.getElementById('form-event-info') as HTMLDivElement;
    info.innerText = ' ';
    this.getData(e.detail._id);
  }
}
