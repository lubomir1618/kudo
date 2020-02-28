import React from 'react';
// import { CARD_TYPE } from '../../../common/constants';
import { CardIcon } from '../cardIcon/CardIcon';
import './Card.css';

export interface Props {
  awarded: string;
  canVote: boolean;
  cardID: number;
  highlighted: boolean;
  likes: number;
  nameFrom?: string;
  text: string;
  cardType: string;
}

export const Card = (props: Props) => {
  return (
    <div className={'card'}>
      <div className={'card__info'}>
        <CardIcon cardType={props.cardType} />
      </div>
      <div className={'card__body'}>
        <div className={'card__awarded'}>
          <h3>{props.awarded}</h3>
        </div>
        <div className={'card__text'}>{props.text}</div>
        <div className={'card__name'}>{props.nameFrom}</div>
      </div>
      <div className={'card_likes'}>{props.likes}</div>
    </div>
  );
};
