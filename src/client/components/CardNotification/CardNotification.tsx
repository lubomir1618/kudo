import React, { Component } from 'react';

export interface State {
  play: boolean;
}

class CardNotification extends Component<any, State> {
  audio = new Audio('audio/notification.wav');

  constructor(props: any) {
    super(props);

    this.state = {
      play: true
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
      this.setState({ play: true });
    });
  }

  render() {
    this.state.play ? this.audio.play() : this.audio.pause();
    return <div />;
  }
}

export default CardNotification;
