import React from "react";

import {Button} from 'react-toolbox/lib/button';
import Card from 'react-toolbox/lib/card';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import theme from './Poll.scss';


class Poll extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      choice_id: null
    };
  }

  handleChange = (value) => {
    this.setState({choice_id: value});
  };

  handleVote = () => {
    this.props.onVote(this.props.poll.id, this.state.choice_id)
  }

  render() {
    let poll = this.props.poll;

    return (
      <Card theme={theme}>
        <h4>{poll.question}</h4>
        <RadioGroup name='poll' value={this.state.choice_id} onChange={this.handleChange} theme={theme}>
          {poll.choices.map((choice) => <RadioButton key={choice.id} label={choice.text} value={choice.id} theme={theme}/>)}
        </RadioGroup>
        <hr/>
        <Button icon='bookmark' label='Vote' accent onClick={this.handleVote}/>
      </Card>
    );
  }
}

// Counter.propTypes = { initialCount: React.PropTypes.number };

Poll.propTypes = {poll: React.PropTypes.object.isRequired}

export default Poll;
