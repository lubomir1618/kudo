import React from 'react';
import { storiesOf } from '@storybook/react';
import { Knight } from './Knight';

const normal = { mostKudos: 'Erik Schwarz' };
const long = { mostKudos: 'Pyotr Ilyich Tchaikovsky' };


storiesOf('Kudo Knight', module)
  .addDecorator((story) => <div style={{ maxWidth: '280px', margin: '50px' }}>{story()}</div>)
  .add('normal name', () => <Knight {...normal} />)
  .add('long name', () => <Knight {...long} />)

