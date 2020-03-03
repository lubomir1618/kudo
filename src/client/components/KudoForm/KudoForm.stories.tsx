import React from 'react';
import { storiesOf } from '@storybook/react';
import KudoForm from './KudoForm';

storiesOf('KudoForm', module)
  .addDecorator((story) => <div style={{ padding: '3rem', background: '#cecece' }}>{story()}</div>)
  .add('default', () => <KudoForm eventId={'aaaa1111'} />);
