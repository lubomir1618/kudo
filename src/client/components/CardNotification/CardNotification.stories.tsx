import React from 'react';
import { storiesOf } from '@storybook/react';
import CardNotification from './CardNotification';

const play_music = { playMusic: true };

storiesOf('Card Notification', module)
  .addDecorator((story) => <div style={{ maxWidth: '280px', margin: '50px' }}>{story()}</div>)
  .add('play sound', () => <CardNotification {...play_music} />);
