import React from 'react';
import { storiesOf } from '@storybook/react';
import KudoEvent from './KudoEvent';

storiesOf('KudoEvent', module)
  .addDecorator((story) => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => <KudoEvent />);
