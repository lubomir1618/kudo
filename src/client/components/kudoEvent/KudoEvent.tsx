import React from 'react';
import * as I from '../../../common/interfaces';
import { select } from '../../utils/api';
import { getKudoKnight, getKudoNumberList } from '../../utils/client';
import { Knight } from '../Knight/Knight';
import { EventInfo } from '../eventInfo/EventInfo';
import KudoForm from '../KudoForm/KudoForm';
import Card from '../card/Card';
import CardNotification from '../CardNotification/CardNotification';
import './KudoEvent.css';

interface IState {
  cards: I.Card[];
  event: I.Event | undefined;
  is_active: boolean;
}

export default class KudoEvent extends React.Component<{}, IState> {
  private eventId: string;
  public interval!: ReturnType<Window['setInterval']>;
  public defaultRefreshInterval: number;

  constructor(props: any) {
    super(props);
    this.eventId = (this.props as any).match.params.id;
    this.defaultRefreshInterval = 60 * 1000; // 60 seconds
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
    }, this.defaultRefreshInterval);
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
      const card_props = {
        awarded: card_data.awardedTo,
        cardID: card_data._id,
        cardType: card_data.type,
        eventID: card_data.eventId,
        highlighted: this.isHighligted(card_data._id),
        likes: card_data.likes,
        text: card_data.text
      };

      cards.push(<Card key={card_props.cardID} {...card_props} />);
    });

    return cards;
  }

  private isHighligted(cardId: string): boolean {
    return this.state.cards.map((card) => card._id).indexOf(cardId) < 7;
  }

  private getKnight(): JSX.Element {
    // TODO get most frequent name from array
    const list = getKudoNumberList(this.state.cards);

    return (
      <div title={JSON.stringify(list)}>
        <Knight {...{ mostKudos: getKudoKnight(list) }} />
      </div>
    );
  }
}
