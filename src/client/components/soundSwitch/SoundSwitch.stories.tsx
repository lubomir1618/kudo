import React from 'react';
import { storiesOf } from '@storybook/react';
import SoundSwitch from './SoundSwitch';

storiesOf('SoundSwitch', module)
  .addDecorator((story) => <div style={{ padding: '3rem', background: '#cecece' }}>{story()}</div>)
  .add('default', () => <SoundSwitch />);
