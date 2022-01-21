import React, { Component } from 'react';
import { CARD_TYPE } from '../../../common/constants';
import { CardIcon } from '../CardIcon/CardIcon';
import { like } from '../../utils/api';
import './Card.css';

export interface Props {
  awarded: string;
  cardID?: string;
  eventID: string;
  highlighted: boolean;
  likes: number;
  text: string;
  cardType: CARD_TYPE;
  isActive: boolean;
}

export interface State {
  voted: boolean;
}

export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
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
        {this.getVoteButton()}
      </div>
    );
  }

  private vote = (event: any) => {
    const eventID = event.currentTarget.dataset.eventid;
    const cardID = event.currentTarget.dataset.cardid;
    const savedVote = localStorage.getItem(`kudosVote-${eventID}`);
    let voteData = {
      cardID: [],
      eventID
    };

    if (this.props.isActive) {
      if (savedVote) {
        voteData = JSON.parse(savedVote);
      }

      voteData.cardID.push(cardID as never);

      if (!this.alreadyVoted(eventID, cardID)) {
        // API call to increment likes
        like(cardID)
          .then(() => {
            window.setTimeout(() => {
              document.dispatchEvent(new CustomEvent('kudoz::cardListRefresh'));
            }, 500);
          })
          .catch((err: Error) => {
            console.log(`Error: like not inserted - ${err}`);
          });

        this.setState({ voted: true });
        localStorage.setItem(`kudosVote-${eventID}`, JSON.stringify(voteData));
      }
    }
    return;
  };

  private getVoteButton() {
    if (this.props.isActive === false) {
      return (
        <div className="card__likes-noVote" title="event is inactive">
          {this.props.likes}
        </div>
      );
    } else if (this.yourChoice(this.props.eventID, this.props.cardID!)) {
      return (
        <div className="card__likes-yourChoice" title="your choice">
          {this.props.likes}
        </div>
      );
    } else {
      return (
        <div
          onClick={this.vote}
          data-eventid={this.props.eventID}
          data-cardid={this.props.cardID!}
          className="card__likes"
          title="vote">
          {this.props.likes}
        </div>
      );
    }
  }

  private alreadyVoted(eventID: string, cardID: string): boolean {
    const savedVote = localStorage.getItem(`kudosVote-${eventID}`);

    if (savedVote) {
      const data = JSON.parse(savedVote);

      if (data.cardID.includes(cardID)) {
        return true;
      }
    }

    return false;
  }

  private yourChoice(eventID: string, cardID: string): boolean {
    const savedVote = localStorage.getItem(`kudosVote-${eventID}`);
    const ownVOTE = localStorage.getItem('kudoVote-ownCards')
    const ownCards =  ownVOTE ? JSON.parse(ownVOTE) : [];
    if (savedVote) {
      const data = JSON.parse(savedVote);
      if (data.cardID.includes(cardID)) {
        return true;
      }
    }
    if (ownCards.includes(cardID)) { return true; }

    return false;
  }
}
