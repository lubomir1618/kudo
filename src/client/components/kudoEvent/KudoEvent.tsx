import React from 'react';
import * as I from '../../../common/interfaces';
import { select } from '../../utils/api';
import { Knight } from '../Knight/Knight';
import { EventInfo } from '../eventInfo/EventInfo';
import KudoForm from '../KudoForm/KudoForm';
import Card from '../card/Card';
import './KudoEvent.css';

interface IState {
  cards: I.Card[];
  event: I.Event | undefined;
}

export default class KudoEvent extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      cards: [],
      event: undefined
    };
  }

  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::cardListRefresh', () => {
      this.getData();
    });
  }
  
  public render() {
    const eventId = this.state.event && this.state.event._id ? this.state.event._id : '';

    return (
      <div className='kudoEvent'>
        <div className="event_info">
          {this.getEvent()}
          {this.getKnight()}
          <KudoForm eventId={eventId} />
        </div>
        <div className="event_cards">
          {this.processCards()}
        </div>
      </div>
    );
  }

  private getData() {
    select<I.Card[]>('/api/cards').then((data) => {
      data.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
      this.setState({ cards: data });
    });
    select<I.Event>('/api/events', {state: 'active'}).then((data) => this.setState({ event: data }));
  }

  private getEvent(): JSX.Element {
    if (this.state.event) {
      const event_props = {
        dateFrom: this.state.event.dateFrom,
        dateTo: this.state.event.dateTo,
        eventName: this.state.event.name
      }

      return <EventInfo {...event_props} />;
    }

    return <div />;
  }

  private processCards(): JSX.Element[] {
    const cards: JSX.Element[] = [];

    this.state.cards.forEach(card_data => {
      const card_props = {
        awarded: card_data.awardedTo,
        cardID: card_data._id,
        cardType: card_data.type,
        eventID: card_data.eventId,
        highlighted: false,
        likes: card_data.likes,
        text: card_data.text
      }

      cards.push(<Card key={card_props.cardID} {...card_props} />);
    });
    
    return cards;
  }

  private getKnight(): JSX.Element {
    // TODO get most frequent name from array
    return <Knight {...{ mostKudos: 'Pyotr Ilyich Tchaikovsky' }} />;
  }
}