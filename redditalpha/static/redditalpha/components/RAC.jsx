import React from 'react';
import Card from 'react-toolbox/lib/card';

import Input from 'react-toolbox/lib/input';
import Table from 'react-toolbox/lib/table';


const UserModel = {
  name: {type: String},
  date: {type: String},
  time: {type: String}
};

const users = [
  {name: 'Heat 1', date: "10/2/16", time: '3:00 PM EST'},
  {name: 'Heat 2', date: '10/2/16', time: '4:30 PM EST'},
  {name: 'Heat 3', date: '10/9/16', time: '3:00 PM EST'},
  {name: 'Heat 4', date: '10/9/16', time: '4:30 PM EST',},
  {name: 'Heat 5', date: '10/16/16', time: '3:00 PM EST',},
  {name: 'Heat 6', date: '10/16/16', time: '4:30 PM EST',},
  {name: 'Heat 7', date: '10/23/16', time: '2:00 PM EST',},
  {name: 'Heat 8', date: '10/23/16', time: '3:30 PM EST',},
  {name: 'Heat 9', date: '10/27/16', time: '6:00 PM EST',},
  {name: 'Heat 10', date: '10/27/16', time: '12:00 PM EST',},
  {name: 'Heat 11', date: '11/6/16', time: 'TBD',},
  {name: 'Heat 12', date: '11/6/16', time: 'TBD',},
  {name: 'Heat 13', date: '11/13/16', time: 'TBD',},
  {name: 'Heat 14', date: '11/13/16', time: 'TBD',},
  {name: 'Heat 15', date: '11/20/16', time: 'TBD',},
  {name: 'Heat 16', date: '11/20/16', time: 'TBD',},
  {name: 'Heat 17', date: '11/27/16', time: 'TBD',},
  {name: 'Heat 18', date: '11/27/16', time: 'TBD',},
  {name: 'Heat 19', date: '12/4/16', time: 'TBD',},
  {name: 'Heat 20', date: '12/24/16',  time: 'TBD',}
];

export default class RAC extends React.Component {
  constructor(props) {
    super(props);
    this.state {
      selected=[0,1,2,3,4,5,6,7]
    }
  }
  render() {
    return (
      <Card>
        <br/>
        <br/>
          <h2>Reddit Alpha Championship</h2>
          <p>Reddit Alpha Championship is a yearly 10 week tournament series aimed at finding the best Reddit Alpha Family Tourneament player of the year.</p>
          <p>After 20 grueling heats, the top 8 players will play a bracketed event for a cash top prize with a twist.</p>
          <ul>
            <li style={{fontFamily: 'Roboto'}}>1st - $300</li>
            <li style={{fontFamily: 'Roboto'}}>2st - $150</li>
            <li style={{fontFamily: 'Roboto'}}>3rd - $50</li>
          </ul>

        <Table
          model={UserModel}
          selected={this.state.selected}
          source={users}
        />
      </Card>
    );
  }
}
