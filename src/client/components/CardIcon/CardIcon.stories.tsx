import React from 'react';
import { storiesOf } from '@storybook/react';
import { CardIcon } from './CardIcon';
import { CARD_TYPE } from '../../../common/constants';

const great_job = { cardType: CARD_TYPE.great_job };
const awesome = { cardType: CARD_TYPE.totally_awesome };
const well_done = { cardType: CARD_TYPE.well_done };
const many_thanks = { cardType: CARD_TYPE.many_thanks };
const very_happy = { cardType: CARD_TYPE.very_happy };
const congrats = { cardType: CARD_TYPE.congrats };
const proud = { cardType: CARD_TYPE.proud };
const thank_you = { cardType: CARD_TYPE.thank_you };

storiesOf('Card Icon', module)
  .addDecorator((story) => <div style={{ margin: '50px', maxWidth: '280px' }}>{story()}</div>)
  .add('great job', () => <CardIcon {...great_job} />)
  .add('totally awesome', () => <CardIcon {...awesome} />)
  .add('well done', () => <CardIcon {...well_done} />)
  .add('many thanks', () => <CardIcon {...many_thanks} />)
  .add('very happy', () => <CardIcon {...very_happy} />)
  .add('congrats', () => <CardIcon {...congrats} />)
  .add('proud', () => <CardIcon {...proud} />)
  .add('thank you', () => <CardIcon {...thank_you} />);
