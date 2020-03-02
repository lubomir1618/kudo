import React from 'react';
import './EventInfo.css';

export interface Props {
  eventName: string;
  dateFrom: number;
  dateTo: number;
}

function getDate(dateFrom: number, dateTo: number): string {
  const yearFrom = new Date(dateFrom).getFullYear();
  const monthFrom = new Date(dateFrom).getMonth() + 1;
  const dayFrom = new Date(dateFrom).getDate();

  const yearTo = new Date(dateTo).getFullYear();
  const monthTo = new Date(dateTo).getMonth() + 1;
  const dayTo = new Date(dateTo).getDate();

  if (yearFrom !== yearTo) {
    return `${dayFrom}.${monthFrom}.${yearFrom} - ${dayTo}.${monthTo}.${yearTo} `;
  } else if (monthFrom !== monthTo) {
    return `${dayFrom}.${monthFrom} - ${dayTo}.${monthTo}.${yearTo} `;
  } else {
    return `${dayFrom} - ${dayTo}.${monthTo}.${yearTo} `;
  }
}

export const EventInfo = (props: Props) => {
  return (
    <div className="eventInfo">
      <h1>{props.eventName}</h1>
      <h2>{getDate(props.dateFrom, props.dateTo)}</h2>
    </div>
  );
};
