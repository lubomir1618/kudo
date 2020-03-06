import React from 'react';
import { SoundSwitch } from '../soundSwitch/SoundSwitch';
import './KudoSettings.css';

export default function KudoSettings(): JSX.Element {
  return (
    <div className="kudoSettings">
      <SoundSwitch />
    </div>
  );
}
