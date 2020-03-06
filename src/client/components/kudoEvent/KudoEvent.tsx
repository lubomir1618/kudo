import React, { RefObject } from 'react';
import * as I from '../../../common/interfaces';
import { select } from '../../utils/api';
import { getKudoKnight, getKudoNumberList } from '../../utils/client';
import { Knight } from '../Knight/Knight';
import { EventInfo } from '../eventInfo/EventInfo';
import KudoForm from '../KudoForm/KudoForm';
import Card, { Props } from '../card/Card';
import CardNotification from '../CardNotification/CardNotification';
import './KudoEvent.css';

const TWOMIN = 120000;
const REFRESH = 60 * 1000; // 60 seconds

interface IState {
  cards: I.Card[];
  event: I.Event | undefined;
  is_active: boolean;
}

export default class KudoEvent extends React.Component<{}, IState> {
  private eventId: string;
  public interval!: ReturnType<Window['setInterval']>;
  private newCardRef: RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.eventId = (this.props as any).match.params.id;
    this.newCardRef = React.createRef();
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

    window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      this.getData();
    }, REFRESH);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return this.state.event ? (
      <div className="kudoEvent">
        <div className="event_info">
          {this.getEvent()}
          {this.getKnight()}
          <KudoForm eventId={this.eventId} isActive={this.state.is_active} />
        </div>
        <div className="event_cards">{this.processCards()}</div>
        <CardNotification />
        {this.getNewCard()}
      </div>
    ) : (
      <div />
    );
  }

  private getData() {
    const now = new Date().getTime();
    
    select<I.Card[]>('/api/cards', { eventId: this.eventId }).then((data) => {
      if (Array.isArray(data)) {
        if (this.state.cards.length < data.length) {
          document.dispatchEvent(new CustomEvent('kudoz::newNotification'));
        }

        data.sort((a, b) => (a.likes > b.likes ? -1 : 1));
        this.setState({ cards: data });
      } else {
        this.setState({ cards: [data] });
      }
    });

    select<I.Event>('/api/events', { _id: this.eventId }).then((data) => {
      this.setState({
        event: data,
        is_active: data.dateFrom < now && now < data.dateTo
      });
    });
  }

  private getEvent(): JSX.Element {
    if (this.state.event) {
      const event_props = {
        dateFrom: this.state.event.dateFrom,
        dateTo: this.state.event.dateTo,
        eventName: this.state.event.name
      };

      return <EventInfo {...event_props} />;
    }

    return <div />;
  }

  private processCards(): JSX.Element[] {
    const cards: JSX.Element[] = [];

    this.state.cards.forEach((card_data) => {
      cards.push(<Card key={card_data._id} {...this.getCardProps(card_data)} />);
    });

    return cards;
  }

  private getCardProps(card_data: I.Card): Props {
    return {
      awarded: card_data.awardedTo,
      cardID: card_data._id,
      cardType: card_data.type,
      eventID: card_data.eventId,
      highlighted: this.isHighligted(card_data._id),
      isActive: this.state.is_active,
      likes: card_data.likes,
      text: card_data.text
    };
  }

  private isHighligted(cardId: string): boolean {
    return this.state.cards.map((card) => card._id).indexOf(cardId) < 7;
  }

  private getKnight(): JSX.Element {
    // TODO get most frequent name from array
    const list = getKudoNumberList(this.state.cards);

    return (
      <div title={list.map((person) => `${person.name}:${person.count}`).join(', ')}>
        <Knight {...{ mostKudos: getKudoKnight(list) }} />
      </div>
    );
  }

  private getNewCard(): JSX.Element {
    const last_card = this.state.cards.length > 0
      ? this.state.cards[this.state.cards.length - 1]
      : undefined;
    const diff = new Date().getTime() - TWOMIN;

    if (last_card && last_card.created > diff) {
      setTimeout(() => {
        if (this.newCardRef.current) {
          this.newCardRef.current.remove();
        }
      }, REFRESH);

      return <div className='newCard' ref={this.newCardRef}><Card key={last_card._id} {...this.getCardProps(last_card)} /></div>
    }

    return <div />;
  }
}
