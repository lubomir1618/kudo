import React from 'react';
import { CARD_TYPE } from '../../../common/constants';
import './CardIcon.css';

export interface Props {
  cardType: string;
}

function getIcon(cardType: string): string {
  switch (cardType) {
    case CARD_TYPE.great_job:
      return '009-positive-vote.svg';
    case CARD_TYPE.totally_awesome:
      return '005-star.svg';
    case CARD_TYPE.well_done:
      return '006-smiling-face.svg';
    case CARD_TYPE.many_thanks:
      return '003-flower.svg';
    case CARD_TYPE.very_happy:
      return '002-heart.svg';
    case CARD_TYPE.congrats:
      return '004-balloons.svg';
    case CARD_TYPE.proud:
      return '001-crowns.svg';
    case CARD_TYPE.thank_you:
      return '010-birthday-cupcake.svg';
    default:
      return '005-star.svg';
  }
}

export const CardIcon = (props: Props) => {
  return (
    <div className="cardIcon">
      <img src={`/img/${getIcon(props.cardType)}`} title={props.cardType.replace('_', ' ').toUpperCase()} />
    </div>
  );
};
