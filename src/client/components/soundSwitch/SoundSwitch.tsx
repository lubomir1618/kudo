import React, { Component } from 'react';
import { soundTurnedOn } from '../../utils/client';
import './soundSwitch.css';

export interface Props {
  temp?: string;
}

export interface State {
  sound: string;
}

export default class SoundSwitch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sound: soundTurnedOn() ? 'on' : 'off'
    };
  }

  public render(): JSX.Element {
    return (
      <div
        className={`soundSwitch ${this.state.sound === 'off' ? 'soundSwitch--off' : 'soundSwitch--on'}`}
        title={`${this.state.sound === 'off' ? 'Turn sound on' : 'Turn sound off'}`}
        onClick={this.soundOnOff.bind(this)}
      />
    );
  }

  private soundOnOff(): void {
    this.setState({ sound: soundTurnedOn() ? 'off' : 'on' });

    const data = localStorage.getItem('kudosSettings');
    let settings;

    if (data) {
      settings = JSON.parse(data);

      if (settings && settings.sound === 'on') {
        settings.sound = 'off';
      } else {
        settings.sound = 'on';
      }
    } else {
      settings = { sound: 'on' };
    }

    localStorage.setItem('kudosSettings', JSON.stringify(settings));
  }
}
