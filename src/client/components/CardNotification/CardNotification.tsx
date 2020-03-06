import React, { Component } from 'react';
import { soundTurnedOn } from '../../utils/client';

export interface Props {
  playMusic?: boolean;
}

export interface State {
  play: boolean;
}

class CardNotification extends Component<Props, State> {
  audio = new Audio('/audio/notification.wav');

  constructor(props: Props) {
    super(props);

    this.state = {
      play: this.props.playMusic ? this.props.playMusic : false
    };
  }

  componentDidMount() {
    this.audio.addEventListener('ended', () => this.setState({ play: false }));
    document.addEventListener('kudoz::newNotification', () => {
      this.setState({ play: true });
    });
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () => this.setState({ play: false }));
    document.removeEventListener('kudoz::newNotification', () => {
      this.setState({ play: false });
    });
  }

  render() {
    this.state.play && soundTurnedOn() ? this.audio.play() : this.audio.pause();
    return <div />;
  }
}

export default CardNotification;
