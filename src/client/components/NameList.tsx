import React, { Component } from 'react';
import  { insert, select, update } from '../utils/api';
import * as E from '../../common/constants';
import * as I from '../../common/interfaces';

interface IEventListProps {
  role: E.USER_ROLE;
  userId: string;
}

interface IEventListState extends IEventListProps {
  data: I.NameList[];
  loading: boolean;
  namesData: string;
  mode: string;
}

export default class NameList extends Component<IEventListProps, IEventListState> {
  private bind: {
    onClickHandler: (e: React.FormEvent) => void;
    onListRefresh: EventListener;
    onNameListChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

  constructor(props: IEventListProps) {
    super(props);
    this.state = {
      data: [],
      namesData: '',
      loading: true,
      role: props.role,
      userId: props.userId,
      mode: 'update'
    };
    this.bind = {
      onClickHandler: this.onClickHandler.bind(this),
      onListRefresh: this.onListRefresh.bind(this) as EventListener,
      onNameListChange: this.onNameListChange.bind(this)
    };
  }
  public onNameListChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({namesData: e.target.value});

  }
  public componentDidMount() {
    this.getData();
    document.addEventListener('kudoz::eventListRefresh', this.bind.onListRefresh);
  }

  public render() {
    const { data, loading, namesData } = this.state;
    const disabled = !namesData.length
    return (
      <section id="name_list" className="pane" key="nameList">
        <h4>
          Name list
        </h4>
          {
              loading ? this.loading() : (<div style={{margin: '0 auto', width: '80%'}}>
                  <form className="pane_form" id="form-namelist-form" onSubmit={this.bind.onClickHandler}>
                  <textarea onChange={this.bind.onNameListChange} style={{width: '100%', height: '200px', display: 'block'}} defaultValue={namesData}></textarea>
                  <button className={`gen_button disabled_${disabled}`} disabled={disabled} onClick={this.bind.onClickHandler}>
                  {`${this.state.mode} Name List`}
                </button>
                </form>
                <div className="pane_form" id="form-namelist-info"></div>
                </div>
              )}
      </section>
    );
  }
  private loading(): JSX.Element {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  private getData() {
    const where = { userId: this.state.userId };

    select<I.NameList[]>('/api/namelist', where).then((data: I.NameList[]) => {
      const mode = !data || data.length === 0 ? 'insert' : 'update';
      const namesData = mode === 'insert' ? '' : data[0].names;
      this.setState({ mode, namesData, data, loading: false })
    });
  }
    private onClickHandler(e:  React.FormEvent): void {
        e.preventDefault();
        const info = document.getElementById('form-namelist-info') as HTMLDivElement;
        const data = {names: this.state.namesData.trim(), userId: this.state.userId}
        const count = data.names.split(',').length;
        
        if (data.names.length === 0) {
            info.innerText = 'Please fill the name list.';
            return;
        }

              if (this.state.mode === 'insert') {
            insert<I.NameList>('/api/namelist', data)
              .then((created) => {
                info.innerText = `Name list created. Names counted: ${count}`;
                this.setState({mode: 'update', data: [created]});
              })
              .catch((err: Error) => {
                info.innerText = `Error: ${err.message}`;
              });
          } else {
            update<I.NameList>('/api/namelist', this.state.data[0]._id as string, data)
              .then(() => {
                info.innerText = `Name list updated. New count of names: ${count}`;
              })
              .catch((err: Error) => {
                info.innerText = `Error: ${err.message}`;
              });
          }
    }

  private onListRefresh() {
    this.setState({ loading: true });
    this.getData();
  }
}