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
  is_active: boolean;
}

export default class KudoEvent extends React.Component<{}, IState> {
  private eventId: string;

  constructor(props: any) {
    super(props);
    this.eventId = (this.props as any).match.params.id;

    this.state = {
      cards: [],
      event: undefined,
      is_active: false
    };
  }

  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::cardListRefresh', () => {
      this.getData();
    });
  }
  
  public render() {
    return (this.state.event
      ? <div className='kudoEvent'>
          <div className="event_info">
            {this.getEvent()}
            {this.getKnight()}
            <KudoForm eventId={this.eventId} isActive={this.state.is_active} />
          </div>
          <div className="event_cards">
            {this.processCards()}
          </div>
        </div>
      : <div />
    );
  }

  private getData() {
    const now = new Date().getTime();

    select<I.Card[]>('/api/cards', {eventId: this.eventId}).then((data) => {
      if (Array.isArray(data)) {
        data.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
        this.setState({ cards: data });
      } else {
        this.setState({ cards: [data] });
      }
    });

    select<I.Event>('/api/events', {_id: this.eventId})
    .then((data) => {
      this.setState({
        event: data,
        is_active: data.dateFrom < now && now < data.dateTo
      })
    });
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
        highlighted: this.isHighligted(card_data._id),
        likes: card_data.likes,
        text: card_data.text
      }

      cards.push(<Card key={card_props.cardID} {...card_props} />);
    });
    
    return cards;
  }

  private isHighligted(cardId: string): boolean {
    return this.state.cards.map(card => card._id).indexOf(cardId) < 7;
  }

  private getKnight(): JSX.Element {
    // TODO get most frequent name from array
    return <Knight {...{ mostKudos: 'Pyotr Ilyich Tchaikovsky' }} />;
  }
}