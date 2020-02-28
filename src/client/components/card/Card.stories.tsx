import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from './Card';
import { CARD_TYPE } from '../../../common/constants';

const cardTypes = [
  'great_job',
  'totally_awesome',
  'well_done',
  'many_thanks',
  'very_happy',
  'congrats',
  'proud',
  'thank_you'
];

const props = {
  awarded: 'Janka Kudlikova',
  canVote: true,
  cardID: 333,
  cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
  highlighted: true,
  likes: 12,
  nameFrom: 'J.P.',
  text: 'Donut chupa chups jelly brownie choco late chocolate bar cookie'
};

storiesOf('Card', module)
  .addDecorator((story) => <div style={{ maxWidth: '300px', margin: '50px' }}>{story()}</div>)
  .add('default', () => <Card {...props} />)
  .add('highlighted', () => <Card {...props} />)
  .add('no votes', () => <Card {...props} />);
