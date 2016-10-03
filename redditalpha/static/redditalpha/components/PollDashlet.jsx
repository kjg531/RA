import React from "react";

import {Button} from 'react-toolbox/lib/button';
import Card from 'react-toolbox/lib/card';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import theme from './PollDashlet.scss';


class PollDashlet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      poll: null,
      choice_id: null
    };
  }

  componentWillMount() {
    this.loadPoll();
  }

  loadPoll = () => {
    var request = $.ajax({
      url: '/api/polls/',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({poll: data.poll || null});
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error loading poll from api');
    });
  }
  
  handleVote = () =>{
    var request = $.ajax({
      url: '/api/polls/' + this.state.poll.id + '/vote',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      data: {choice: this.state.choice_id}
    });

    request.done((data, textStatus, jqXHR) => {
      this.loadPoll();
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      this.loadPoll();
    });
  }


  handleChange = (value) => {
    this.setState({choice_id: value});
  };

  render() {
    let poll = this.state.poll;

    if (poll == null){
      return (
        <Card theme={theme}>
          <h2>There are no active polls at the moment.</h2>
        </Card>
      );
    }else{
      if (poll.taken){
        return (
          <Card theme={theme}>
            <h2>{poll.question}</h2>
            {poll.results.map((result) => <div key={result.id}>{result.text}: {result.votes}<ProgressBar type="linear" mode="determinate" value={result.percentage} /><br/><br/></div>)}
          </Card>
        );
      }else{
        return (
          <Card theme={theme}>
            <h2>{poll.question}</h2>
            <RadioGroup name='poll' value={this.state.choice_id} onChange={this.handleChange} theme={theme}>
              {poll.choices.map((choice) => <RadioButton key={choice.id} label={choice.text} value={choice.id} theme={theme}/>)}
            </RadioGroup>
            <hr/>
            <Button icon='bookmark' label='Vote' onClick={this.handleVote}/>
          </Card>
        );
      }
    }
  }
}

export default PollDashlet;