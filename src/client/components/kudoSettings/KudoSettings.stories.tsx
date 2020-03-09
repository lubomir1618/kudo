import React from 'react';
import { storiesOf } from '@storybook/react';
import KudoSettings from './KudoSettings';

storiesOf('KudoSettings', module)
  .addDecorator((story) => <div style={{ padding: '3rem', background: '#cecece' }}>{story()}</div>)
  .add('default', () => <KudoSettings />);
