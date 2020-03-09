import * as React from 'react';
import * as ReactDOM from 'react-dom';

import EventForm from './components/EventForm/EventForm';
import EventList from './components/EventList/EventList';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';

ReactDOM.render(
  <div className="eventAdmin">
    <header>
      <h1>Event admin</h1>
    </header>
    <EventForm />
    <UserForm />
    <EventList />
    <UserList />
  </div>,
  document.getElementById('admin')
);
