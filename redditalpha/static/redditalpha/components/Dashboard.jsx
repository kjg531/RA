import React from "react";

import Poll from './Poll';


class Dashboard extends React.Component {
  style = {
  }

  constructor(props){
    super(props);
    this.state = {
      'poll': null
    }
  }

  loadPoll = () => {
    console.log('loadPoll()');
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
  
  handleVote = (poll_id, choice_id) =>{
    var request = $.ajax({
      url: '/api/polls/' + poll_id + '/vote',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      data: {choice: choice_id}
    });

    request.done((data, textStatus, jqXHR) => {
      this.loadPoll();
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      this.loadPoll();
    });
  }

  componentWillMount() {
    this.loadPoll();
  }

  render() {
    return (
      <div style={{maxWidth:360}}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        {this.state.poll ? <Poll poll={this.state.poll} onVote={this.handleVote}/>: <h1>No polls at the moment</h1>}
      </div>
    )
  }
}

export default Dashboard;
