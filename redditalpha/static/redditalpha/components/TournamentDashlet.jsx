import React from 'react';

import {Button} from 'react-toolbox/lib/button';
import Card from 'react-toolbox/lib/card';
import theme from './PollDashlet.scss';

export default class TournamentDashlet extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      series: null
    };
  }
  
  componentWillMount() {
    this.loadSeries();
  }

  loadSeries = () => {
    var request = $.ajax({
      url: '/api/tournaments/',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({series: data.series || null});
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error loading series from api');
    });
  }

  handleRegister = () => {
    var request = $.ajax({
      url: '/api/tournaments/series/' + this.state.series.id + '/register',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    request.done((data, textStatus, jqXHR) => {
      this.loadSeries();
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      this.loadSeries();
    });
  }

  render() {
    let series = this.state.series;

    if (series == null){
      return (
        <Card>
          <h2>Tournament Series Stuff</h2>
        </Card>
      );
    }else{
      return (
        <Card>
          <h2>{series.name}</h2>
          <h3>{series.participants} users registered</h3>
          {series.participating ? <small>You've already registered</small>:<Button icon='bookmark' label='Register!' accent onClick={this.handleRegister}/>}
        </Card>
      );
    }
  }
}
