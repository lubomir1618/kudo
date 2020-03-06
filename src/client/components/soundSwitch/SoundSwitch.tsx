import * as React from 'react';
import './soundSwitch.css';

export interface Props {
  temp?: string;
}

export const SoundSwitch = (props: Props) => <div className="soundSettings soundSwitch--on" />;
