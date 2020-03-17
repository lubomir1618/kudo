import React from 'react';
import { storiesOf } from '@storybook/react';
import { Knight } from './Knight';

const normal = { mostKudos: 'Erik Schwarz' };
const long = { mostKudos: 'Pyotr Ilyich Tchaikovsky' };

storiesOf('Kudo Knight', module)
  .addDecorator((story) => <div style={{ margin: '50px', maxWidth: '280px' }}>{story()}</div>)
  .add('normal name', () => <Knight {...normal} />)
  .add('long name', () => <Knight {...long} />);
