import React from 'react';
import { CardIcon } from '../cardIcon/CardIcon';
import './Card.css';

export interface Props {
  awarded: string;
  cardID: number;
  eventID: number;
  highlighted: boolean;
  likes: number;
  text: string;
  cardType: string;
}

const vote = (event: any) => {
  const eventID = Number(event.currentTarget.dataset.eventid);
  const cardID = Number(event.currentTarget.dataset.cardid);
  const voteData = {
    cardID,
    eventID
  };

  if (!alreadyVoted(eventID)) {
    // API call to increment likes

    localStorage.setItem(`kudosVote-${eventID}`, JSON.stringify(voteData));
  }

  return;
};

export function alreadyVoted(eventID: number): boolean {
  const savedVote = localStorage.getItem(`kudosVote-${eventID}`);

  if (savedVote) {
    return true;
  }

  return false;
}

export function yourChoice(eventID: number, cardID: number): boolean {
  const savedVote = localStorage.getItem(`kudosVote-${eventID}`);

  if (savedVote) {
    const data = JSON.parse(savedVote);
    if (Number(data.cardID) === cardID) {
      return true;
    }
  }

  return false;
}

export const Card = (props: Props) => {
  return (
    <div className="card">
      <div className="card__icon">
        <CardIcon cardType={props.cardType} />
      </div>
      <div className={props.highlighted ? 'card__text-highlighted ' : 'card__text'}>
        <h3>{props.awarded}</h3>
        <p>{props.text}</p>
      </div>
      {yourChoice(props.eventID, props.cardID) ? (
        <div className="card__likes-yourChoice" title="your choice">
          {props.likes}
        </div>
      ) : (
        <div
          onClick={vote}
          data-eventid={props.eventID}
          data-cardid={props.cardID}
          className="card__likes"
          title="vote">
          {props.likes}
        </div>
      )}
    </div>
  );
};
