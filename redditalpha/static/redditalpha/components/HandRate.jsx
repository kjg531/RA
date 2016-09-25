import React from 'react';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

export default class RadioTest extends React.Component {
  state = {
    currentValue: 'fromhell',
  };

  handleChange = (selectedValue) => {
    this.setState({currentValue: ''});
  }
  

  render() {
    return (
      <RadioGroup name='comic' value={this.state.currentValue} onChange={this.handleChange}>
        <RadioButton label='The Walking Dead' value='thewalkingdead'/>
        <RadioButton label='From Hell' value='fromhell' />
        <RadioButton label='V for a Vendetta' value='vvendetta'/>
      </RadioGroup>
    );
  }
}