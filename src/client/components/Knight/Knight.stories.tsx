import React from 'react';
import { storiesOf } from '@storybook/react';
import { Knight } from './Knight';

const props = { mostKudos: 'Erik Schwarz' };

storiesOf('Kudo Knight', module)
  .addDecorator((story) => <div style={{ maxWidth: '280px', margin: '50px' }}>{story()}</div>)
  .add('current knight', () => <Knight {...props} />)
