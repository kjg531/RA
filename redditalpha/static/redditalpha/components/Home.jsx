import React from "react";
import Card from 'react-toolbox/lib/card';
import HomeMiddleComponent from './HomeMiddleComponent';
import HomeBottomComponent from './HomeBottomComponent';

import theme from './Home.scss';


class Home extends React.Component {
  render() {
    return (
      <div style={{maxWidth: 1000, margin: '60px auto', textAlign: 'center'}}>
        <Card theme={theme}>
        <h1>Welcome to Reddit Alpha</h1>
        <p>The Reddit Alpha Clan Family was established by Woody shortly after the Clash Royale soft launch. From humble beginnings, Reddit Alpha has grown into a Global Top 100 clan with hundreds of members throughout a thriving feeder system of six affiliate clans. We are a founding member of Reddit's Royale Clan System and have claimed the championship of every RCS tournament so far.</p>
        </Card>
        <Card theme={theme}>
          <h2>Clans</h2>
        </Card>
        <HomeMiddleComponent />
        <HomeBottomComponent />
      </div>
    )
  }
}

export default Home;
