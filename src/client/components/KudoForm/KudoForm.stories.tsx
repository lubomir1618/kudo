import React from 'react';
import { storiesOf } from '@storybook/react';
import KudoForm from './KudoForm';

storiesOf('KudoForm', module)
  .addDecorator((story) => <div style={{ background: '#cecece', padding: '3rem' }}>{story()}</div>)
  .add('active', () => <KudoForm eventId={'aaaa1111'} isActive={true} />)
  .add('disabled', () => <KudoForm eventId={'aaaa1111'} isActive={false} />);
