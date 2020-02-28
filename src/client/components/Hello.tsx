import * as React from 'react';
import { Knight } from '../components/Knight/Knight';
import { CardIcon } from '../components/cardIcon/CardIcon';
import HelloSvg from '../icons/3h.svg';
import './Hello.css';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1 className="big">
    <HelloSvg />
    Hello from {props.compiler} and {props.framework}!<Knight mostKudos="Janko Haluska"></Knight>{' '}
    <CardIcon cardType="totally_awesome"></CardIcon>
  </h1>
);
