import React, { RefObject } from 'react';
import SelectSearch from 'react-select-search';
import * as I from '../../../common/interfaces';
import { insert } from '../../utils/api';
import { CARD_TYPE } from '../../../common/constants';
import { CardIcon } from '../cardIcon/CardIcon';
import data from '../../assets/data';
import './KudoForm.css';

const enum FORM_ERROR {
  name = 'name',
  message = 'message'
}

export interface ISelectResponse {
  name: string;
  value: string;
  index: number;
}

const CARD_TYPES = Object.values(CARD_TYPE);

const PEOPLE = [...data];
PEOPLE.map((folk: any) => {
  folk.value = folk.name
});

interface IState {
  type: CARD_TYPE;
  name: string | undefined;
}

interface IProps {
  eventId: string;
  isActive: boolean;
}

export default class KudoForm extends React.Component<IProps, IState> {
  private eventId: string;
  private formRef: RefObject<HTMLDivElement>;
  private messageRef: RefObject<HTMLTextAreaElement>;

  constructor(props: IProps) {
    super(props);
    this.eventId = props.eventId;
    this.formRef = React.createRef();
    this.messageRef = React.createRef();

    this.state = {
      name: undefined,
      type: CARD_TYPE.totally_awesome
    }
  }

  public componentDidMount() {
    if (this.formRef.current && this.messageRef.current) {
      const name_options = this.formRef.current.querySelector('.name .select-search-box__options');
      const type_options = this.formRef.current.querySelector('.typePicker .select-search-box__options');
      const message_height = this.messageRef.current.parentElement!.offsetHeight;

      (name_options as HTMLDivElement).style.maxHeight = `${message_height - 1}px`;
      (type_options as HTMLDivElement).style.height = `${message_height + 55}px`;
    }
  }

  public render() {
    const buttonClass = this.props.isActive ? '' : 'disabled';

    return (
      <div className='kudoForm' ref={this.formRef}>
        <div className='typePicker'>
          {this.typePicker()}
        </div>
        <div className='main'>
          <div className='name'>
            Meno {this.peoplePicker()}
          </div>
          <div className='message'>
            <textarea ref={this.messageRef} placeholder='Sprava' />
          </div>
        </div>
        <div className={`submit ${buttonClass}`} onClick={() => this.onSubmit()}>Daj Kudos</div>
      </div>
    );
  }

  private typePicker(): JSX.Element {
    const options = CARD_TYPES.map((type: CARD_TYPE) => {
      return {
        name: type.replace('_', ' '),
        value: type
      };
    });
    const handleClick = (valueProps: ISelectResponse) => this.onTypeSelect(valueProps);
  
    return (<SelectSearch
      options={options}
      value={this.state.type}
      search={false}
      onChange={handleClick}
      renderOption={this.renderOption}
      renderValue={this.renderValue}
      />
    );
  };

  private renderValue(label: string): JSX.Element {
    return (<div className='typeTitle'>
      <CardIcon {...{cardType: label.replace(' ', '_') as CARD_TYPE }} />{label}
    </div>);
  }

  private renderOption(valueProps: ISelectResponse): JSX.Element {
    return (<div>
      <CardIcon {...{cardType: valueProps.value as CARD_TYPE }} /><div>{valueProps.name}</div>
    </div>);
  }

  private peoplePicker(): JSX.Element {
    const handleClick = (valueProps: ISelectResponse) => this.onFolkSelect(valueProps);

    return (<SelectSearch
      options={PEOPLE}
      onChange={handleClick}
      placeholder='Select name'
      value={this.state.name}
      />
    );
  };

  private onTypeSelect(valueProps: ISelectResponse): void {
    this.setState({ type: valueProps.value as CARD_TYPE });
  }

  private onFolkSelect(valueProps: ISelectResponse): void {
    this.setState({ name: valueProps.name });
  }

  private drawRed(error: FORM_ERROR) {
    const classlist = this.formRef.current!.getElementsByClassName(error)[0].classList;

    classlist.add('red')

    setTimeout(() => {
      classlist.remove('red')
    }, 700);
  }

  private onSubmit(): void {
    if (this.props.isActive) {
      if (this.state.name === undefined) {
        this.drawRed(FORM_ERROR.name)
      } else if (!this.messageRef.current
        || (this.messageRef.current && this.messageRef.current.value.trim().length === 0)
        || (this.messageRef.current && this.messageRef.current.value === 'Sprava')
      ) {
        this.drawRed(FORM_ERROR.message);
      } else {
        const new_card = {
          awardedTo: this.state.name,
          created: new Date().getTime(),
          eventId: this.eventId,
          likes: 0,
          text: this.messageRef.current.value,
          type: this.state.type
        }

        insert<I.Card>('/api/cards', new_card as I.Card)
          .then(() => {
            this.clearForm();
            document.dispatchEvent(new CustomEvent('kudoz::cardListRefresh'));
          })
          .catch((err: Error) => {
            console.log('Error: card not inserted');
          });
      }
    }
  }

  private clearForm(): void {
    this.setState({ name: undefined });
    this.messageRef.current!.value = '';
  }
}