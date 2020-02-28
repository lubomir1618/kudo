import React from 'react';
import { insert } from '../../utils/api';
import * as I from '../../../common/interfaces';

function onClickHandler(e: React.FormEvent) {
  e.preventDefault();

  const data: any = {};
  const info = document.getElementById('form-event-info') as HTMLDivElement;
  const form = document.getElementById('form-event') as HTMLFormElement;
  const formData = new FormData(form);
  formData.forEach((item, key) => (data[key] = item));

  insert<I.Event>('/api/events', data as I.Event)
    .then(() => {
      info.innerText = 'Success: Event added.';
      // @todo send message to EventList
    })
    .catch((err: Error) => {
      info.innerText = `Error: ${err.message}`;
    });
}

export default function EventForm() {
  return (
    <form id="form-event">
      <label htmlFor="dateFrom">Date from: </label>
      <input type="text" id="event-dateFrom" name="dateFrom" defaultValue="1581724800000" />*
      <br />
      <label htmlFor="dateTo">Date to: </label>
      <input type="text" id="event-dateTo" name="dateTo" defaultValue="1584230400000" />*
      <br />
      <label htmlFor="name">Event name: </label>
      <input type="text" id="event-name" name="name" placeholder="event name" />*
      <br />
      <label htmlFor="state">State: </label>
      <select id="event-state" name="state" defaultValue="active">
        *<option value="past">past</option>
        <option value="active">active</option>
        <option value="future">future</option>
      </select>
      <br />
      <input type="button" onClick={onClickHandler} value="Add event 📅" />
      <div id="form-event-info" />
    </form>
  );
}
