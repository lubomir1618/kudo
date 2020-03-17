import React from 'react';
import { storiesOf } from '@storybook/react';
import KudoSettings from './KudoSettings';

storiesOf('KudoSettings', module)
  .addDecorator((story) => <div style={{ background: '#cecece', padding: '3rem' }}>{story()}</div>)
  .add('default', () => <KudoSettings />);
