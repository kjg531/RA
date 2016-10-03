import React from "react";

import PollDashlet from './PollDashlet';
import TournamentDashlet from './TournamentDashlet'
import LeaderboardDashlet from './LeaderboardDashlet';

class Dashboard extends React.Component {
  style = {
  }

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div style={{maxWidth:360, margin: 'auto'}}>
        <br/>
        <br/>
        <br/>
      <br/>
        <br/>
        <PollDashlet />
        <br/>
        <TournamentDashlet />
        <br/>
        <LeaderboardDashlet />
        <br/>
      </div>
    )
  }
}

export default Dashboard;
