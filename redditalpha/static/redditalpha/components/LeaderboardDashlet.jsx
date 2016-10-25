import React from 'react';

import Card from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import theme from './LeaderboardDashlet.scss'


export default class LeaderboardDashlet extends React.Component {
  // static propTypes = {
  //     name: React.PropTypes.string,
  // };

  constructor(props) {
      super(props);
      this.state = {
          series: null,
          leaderboard: []
      };
  }

  componentWillMount() {
    this.loadLeaderboard();
  }

  loadLeaderboard = () => {
    var request = $.ajax({
      url: '/api/tournaments/leaderboard',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        series: data.series,
        leaderboard: data.leaderboard || []
      });
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error loading leaderboard from api');
    });
  }

  render() {
    let series = this.state.series;
    let leaderboard = this.state.leaderboard;

    if (series == null){
      return (
        <Card theme={theme}>
          <h2>There is currently no ongoing tournament series</h2>
        </Card>
      );
    }else{
      return (
        <Card theme={theme}>
          <h2>{series.name}</h2>
          <List selectable ripple>
            <ListSubHeader caption='Leaderboard' />
            {leaderboard.map((score, i) => (<ListItem avatar={score.user.avatar} theme={theme} caption={(i + 1) + ': ' + score.user.display_name} legend="" rightIcon={<span>{score.cards_won}</span>} />))}
          </List>
        </Card>
      );
    }
  }
}
