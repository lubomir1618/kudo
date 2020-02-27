import * as React from 'react';
import {Knight} from '../components/Knight/Knight';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
    <Knight mostKudos="Janko Haluska"></Knight>
  </h1>
);
