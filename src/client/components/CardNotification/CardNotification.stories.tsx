import React from 'react';
import { storiesOf } from '@storybook/react';
import CardNotification from './newCardNotification';

storiesOf('Card Notification', module)
  .addDecorator((story) => <div style={{ maxWidth: '280px', margin: '50px' }}>{story()}</div>)
  .add('play sound', () => <CardNotification />);
