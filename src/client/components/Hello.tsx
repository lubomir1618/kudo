import * as React from 'react';
import {Knight} from '../components/Knight/Knight';
// import HelloSvg from '../icons/3h.svg';
import './Hello.css';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1 className="big">
    Hello from {props.compiler} and {props.framework}!
    <Knight mostKudos="Janko Haluska"></Knight>
  </h1>
);
