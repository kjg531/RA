import React from 'react';

import { Link } from 'react-router'

import {Button} from 'react-toolbox/lib/button';
import Card from 'react-toolbox/lib/card';
import theme from './TournamentDashlet.scss';

export default class TournamentDashlet extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  style = {
    button: {
      width: '50%'
    }
  }

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
        <Card theme={theme}>
          <h2>Reddit Alpha Championship</h2>
          <p>Reddit Alpha Championship is a yearly 10 week tournament series aimed at finding the best Reddit Alpha Family Tourneament player of the year.</p>
          <p>Starting on the 2nd of October there will be 2 seperate 1 hour tournaments EVERY SUNDAY!!</p>
          <p>After 20 grueling heats, the top 8 players will play a bracketed event for a cash top prize with a twist.</p>
          <ul>
            <li style={{fontFamily: 'Roboto'}}>1st - $300</li>
            <li style={{fontFamily: 'Roboto'}}>1st - $150</li>
            <li style={{fontFamily: 'Roboto'}}>1st - $50</li>
          </ul>
        </Card>
      );
    }else{
      return (
        <Card theme={theme}>
          <h2>{series.name}</h2>
          <h3>{series.participants} users registered</h3>

          <div style={{display:'inline-block'}}>
            {series.participating ? <small>You've already registered</small>:<Button style={this.style.button} icon='bookmark' label='Register!' onClick={this.handleRegister}/>}
            <Link to="/rac" activeClassName="active">
              <Button icon='bookmark' label='More Info' style={this.style.button} />
            </Link>
          </div>
        </Card>
      );
    }
  }
}
