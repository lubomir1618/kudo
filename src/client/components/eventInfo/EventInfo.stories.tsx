import React from 'react';
import { storiesOf } from '@storybook/react';
import { EventInfo } from './EventInfo';

const props = { eventName: 'Kudos 42', eventDate: '12 - 28.3.2020' };

storiesOf('Event Info', module)
  .addDecorator((story) => (
    <div style={{ maxWidth: '280px', margin: '50px', backgroundColor: '#959a97' }}>{story()}</div>
  ))
  .add('name and date', () => <EventInfo {...props} />);
