import * as React from 'react';
import { Knight } from '../components/Knight/Knight';
import { CardIcon } from '../components/cardIcon/CardIcon';
import Card from '../components/card/Card';
import HelloSvg from '../icons/3h.svg';
import { CARD_TYPE } from '../../common/constants';
import { props_1, props_2 } from './card/Card.stories';

import './Hello.css';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1 className="big">
    <HelloSvg />
    Hello from {props.compiler} and {props.framework}!<Knight mostKudos="Janko Haluska"></Knight>{' '}
    <CardIcon cardType={CARD_TYPE.totally_awesome}></CardIcon>
    <Card {...props_1} />
    <Card {...props_2} />
  </h1>
);
