import * as React from 'react';
import * as ReactDOM from 'react-dom';

import EventForm from './components/EventForm/EventForm';
import EventList from './components/EventList/EventList';

ReactDOM.render(
  <div className="eventAdmin">
    <header>
      <h1>Event admin</h1>
    </header>
    <EventForm />
    <EventList />
  </div>,
  document.getElementById('admin')
);
