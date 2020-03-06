import React from 'react';
import { storiesOf } from '@storybook/react';
import { CARD_TYPE } from '../../../common/constants';
import Card from './Card';

const cardTypes = Object.values(CARD_TYPE);

export const props_1 = {
  awarded: 'Janka Kudlikova',
  cardID: '2222bbbb',
  cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
  eventID: 'eeee1111',
  highlighted: false,
  isActive: true,
  likes: 9,
  text: 'Donut chupa chups jelly brownie choco late chocolate bar cookie'
};

export const props_2 = {
  awarded: 'Linda Ivanko',
  cardID: 'aaaa1111',
  cardType: cardTypes[Math.floor(Math.random() * cardTypes.length)],
  eventID: 'eeee1111',
  highlighted: true,
  isActive: true,
  likes: 12,
  text:
    'Gummi bears carrot cake powder pie jujubes. Halvah jelly chocolate bar gingerbread dragée macaroon. Bonbon cotton candy jujubes cotton candy'
};

storiesOf('Card', module)
  .addDecorator((story) => <div style={{ maxWidth: '300px', margin: '50px' }}>{story()}</div>)
  .add('default', () => <Card {...props_1} />)
  .add('highlighted', () => <Card {...props_2} />);
