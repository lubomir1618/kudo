import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './Card';

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

export const props_1 = {
  awarded: 'Janka Kudlikova',
  cardID: 333,
  cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
  eventID: 6,
  highlighted: false,
  likes: 9,
  text: 'Donut chupa chups jelly brownie choco late chocolate bar cookie'
};

export const props_2 = {
  awarded: 'Linda Ivanko',
  cardID: 333,
  cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
  eventID: 63,
  highlighted: true,
  likes: 12,
  text:
    'Gummi bears carrot cake powder pie jujubes. Halvah jelly chocolate bar gingerbread dragée macaroon. Bonbon cotton candy jujubes cotton candy'
};

storiesOf('Card', module)
  .addDecorator((story) => <div style={{ maxWidth: '300px', margin: '50px' }}>{story()}</div>)
  .add('default', () => <Card {...props_1} />)
  .add('highlighted', () => <Card {...props_2} />);
