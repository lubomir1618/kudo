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

const MODAL_INTERVAL = 120 * 1000;
const MODAL_TIME = 120 * 1000;
const REFRESH = 15 * 1000; // 60 seconds

interface IState {
  cards: I.Card[];
  event: I.Event | undefined;
  is_active: boolean;
  shouldDisplayModal: boolean;
}

function CardModal({newCardProps, onClick}: any) {
  return (
    <div className='newCard'>
      <div>
        <div className='close' onClick={onClick}><img src="/img/cancel.png" /></div>
        <Card {...newCardProps} />
      </div>
    </div>
  )
}

export default class KudoEvent extends React.Component<{}, IState> {
  private eventId: string;
  private interval!: ReturnType<Window['setInterval']>;
  private timeout: any;

  constructor(props: any) {
    super(props);
    this.eventId = (this.props as any).match.params.id;
    this.hideModal = this.hideModal.bind(this);
    this.state = {
      cards: [],
      event: undefined,
      is_active: false,
      shouldDisplayModal: false,
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

  componentDidUpdate(_prevProps:any, prevState:any) {
    if (prevState.cards.length < this.state.cards.length && !this.state.shouldDisplayModal) {
    debugger;

      // ries render modalu
      const new_card = this.state.cards[this.state.cards.length - 1];
      const diff = new Date().getTime() - MODAL_INTERVAL;

      if (new_card && new_card.created > diff)  {
        window.clearTimeout(this.timeout);
        this.setState({shouldDisplayModal: true});
        this.timeout = window.setTimeout(() => {
          this.setState({shouldDisplayModal: false});
        }, MODAL_TIME);
      }
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
    window.clearTimeout(this.timeout);
  }

  public render() {
    const newCard = this.state.cards.length > 0 ? this.getCardProps(this.state.cards[this.state.cards.length -1]) : undefined;
    return this.state.event ? (
      <div className="kudoEvent">
        <div className="event_info">
          {this.getEvent()}
          {this.getKnight()}
          <KudoForm eventId={this.eventId} isActive={this.state.is_active} />
        </div>
        <div className="event_cards">{this.processCards()}</div>
        <CardNotification />
        { this.state.shouldDisplayModal ? <CardModal newCardProps={newCard} onClick={this.hideModal}/>: null }
      </div>
    ) : (
      <div />
    );
  }

  public hideModal(): void {
    this.setState({shouldDisplayModal: false});
  }

  private getData() {
    const now = new Date().getTime();
    
    select<I.Card[]>('/api/cards', { eventId: this.eventId }).then((data) => {
      if (this.state.cards.length < data.length) {
        document.dispatchEvent(new CustomEvent('kudoz::newNotification'));
      }

      data.sort((a, b) => (b.likes - a.likes));
      this.setState({ cards: data });
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
}
