import React, { Component } from 'react';
import { soundTurnedOn } from '../../utils/client';

export interface Props {
  playMusic?: boolean;
}

export interface State {
  play: boolean;
}

class CardNotification extends Component<Props, State> {
  private audio = new Audio('/audio/notification.wav');
  private bind: {
    onEnded: EventListener;
    onNotification: EventListener;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      play: this.props.playMusic ? this.props.playMusic : false
    };
    this.bind = {
      onEnded: this.onEnded.bind(this) as EventListener,
      onNotification: this.onNotification.bind(this) as EventListener
    };
  }

  public componentDidMount() {
    this.audio.addEventListener('ended', this.bind.onEnded);
    document.addEventListener('kudoz::newNotification', this.bind.onNotification);
  }

  public componentWillUnmount() {
    this.audio.removeEventListener('ended', this.bind.onEnded);
    document.removeEventListener('kudoz::newNotification', this.bind.onNotification);
  }

  public render() {
    this.state.play && soundTurnedOn() ? this.audio.play() : this.audio.pause();
    return <div />;
  }

  private onEnded() {
    this.setState({ play: false });
  }

  private onNotification() {
    this.setState({ play: true });
  }
}

export default CardNotification;
