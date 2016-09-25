import React from 'react';
import Card from 'react-toolbox/lib/card';

export default class RAC extends React.Component {
  render() {
    return (
      <Card>
        <br/>
        <br/>
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
  }
}
