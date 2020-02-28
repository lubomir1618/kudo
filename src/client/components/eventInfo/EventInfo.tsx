import React from 'react';
import './EventInfo.css';

export interface Props {
  eventName: string;
  eventDate: string;
}

export const EventInfo = (props: Props) => {
  return (
    <div className="eventInfo">
      <h1>{props.eventName}</h1>
      <h2>{props.eventDate}</h2>
    </div>
  );
};
