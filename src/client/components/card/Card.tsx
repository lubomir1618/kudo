import React, { Component } from 'react';
import { CARD_TYPE } from '../../../common/constants';
import { CardIcon } from '../cardIcon/CardIcon';
import './Card.css';

export interface Props {
  awarded: string;
  cardID: number;
  eventID: number;
  highlighted: boolean;
  likes: number;
  text: string;
  cardType: CARD_TYPE;
}

export interface State {
  voted: boolean;
}

export default class Card extends Component<Props, State> {
  private readonly awarded: string;
  private readonly cardID: number;
  private readonly eventID: number;
  private readonly highlighted: boolean;
  private readonly likes: number;
  private readonly text: string;
  private readonly cardType: string;

  constructor(props: Props) {
    super(props);

    this.awarded = props.awarded;
    this.cardID = props.cardID;
    this.eventID = props.eventID;
    this.highlighted = props.highlighted;
    this.likes = props.likes;
    this.text = props.text;
    this.cardType = props.cardType;
    this.state = {
      voted: false
    };
  }

  public render(): JSX.Element {
    return (
      <div className="card">
        <div className="card__icon">
          <CardIcon cardType={this.props.cardType} />
        </div>
        <div className={this.props.highlighted ? 'card__text-highlighted ' : 'card__text'}>
          <h3>{this.props.awarded}</h3>
          <p>{this.props.text}</p>
        </div>
        {this.yourChoice(this.props.eventID, this.props.cardID) ? (
          <div className="card__likes-yourChoice" title="your choice">
            {this.props.likes}
          </div>
        ) : (
          <div
            onClick={this.vote}
            data-eventid={this.props.eventID}
            data-cardid={this.props.cardID}
            className="card__likes"
            title="vote">
            {this.props.likes}
          </div>
        )}
      </div>
    );
  }

  private vote = (event: any) => {
    const eventID = Number(event.currentTarget.dataset.eventid);
    const cardID = Number(event.currentTarget.dataset.cardid);
    const voteData = {
      cardID,
      eventID
    };

    if (!this.alreadyVoted(eventID)) {
      // API call to increment likes
      /* */

      this.setState({ voted: true });
      localStorage.setItem(`kudosVote-${eventID}`, JSON.stringify(voteData));
    }

    return;
  };

  private alreadyVoted(eventID: number): boolean {
    const savedVote = localStorage.getItem(`kudosVote-${eventID}`);

    if (savedVote) {
      return true;
    }

    return false;
  }

  private yourChoice(eventID: number, cardID: number): boolean {
    const savedVote = localStorage.getItem(`kudosVote-${eventID}`);

    if (savedVote) {
      const data = JSON.parse(savedVote);
      if (Number(data.cardID) === cardID) {
        return true;
      }
    }

    return false;
  }
}
