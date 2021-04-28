import React, {Component, Props} from 'react';
import SoundSwitch from '../SoundSwitch/SoundSwitch';
import './KudoSettings.css';
import Switch from "react-switch";

class KudoSettings extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { checked: window.location.href.includes('?tv=true') };
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(checked: boolean) {
    this.setState({ checked });
    const url = window.location.origin + window.location.pathname;
    window.setTimeout(() => {
      if (checked) {
        window.location.href = `${url}?tv=true`
      } else {
        window.location.href = url;
      }
    }, 200)
    
    
  }

  public render() {
    return (
    <div className="kudoSettings">
      <div className="tv_mode">TV mode: <Switch onChange={this.handleChange} checked={this.state.checked} /></div>
      <div className="sound_mode">Sound: <SoundSwitch /></div>
    </div>
    )}
}

export default KudoSettings;
