import React from 'react';
import { storiesOf } from '@storybook/react';
import { EventInfo } from './EventInfo';

const props = { dateFrom: 1580307649752, dateTo: 1582899649752, eventName: 'Kudos 42' };

storiesOf('Event Info', module)
  .addDecorator((story) => (
    <div style={{ backgroundColor: '#959a97', margin: '50px', maxWidth: '280px' }}>{story()}</div>
  ))
  .add('name and date', () => <EventInfo {...props} />);
