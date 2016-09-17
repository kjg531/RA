import React from "react";
import { Card} from 'react-toolbox/lib/card';
import theme from './Home.scss';
import TwitterTimeline from './TwitterTimeline';
import HomeMiddleComponent from './HomeMiddleComponent';

class Home extends React.Component {
  style = {
  }

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
        <Card theme={theme}>
          <h2>YouTube</h2>
          <div style={{padding:5, margin:5, borderRadius: 12, border: '1px solid black'}}>
          <div className="g-ytsubscribe ytt" data-channelid="UCjC5dP9z3XQY6OEPWh5RiLw" data-layout="full" data-count="default"></div>
          </div>
          <div style={{padding:5, margin:5, borderRadius: 12, border: '1px solid black'}}>
          <div className="g-ytsubscribe" data-channel="wwoody123" data-layout="full" data-count="default"></div>
            </div>
          <div style={{padding:5, margin:5, borderRadius: 12, border: '1px solid black'}}>
          <div className="g-ytsubscribe" data-channelid="UCx6U0bPb5XpShjnAmI_LXHw" data-layout="full" data-count="default"></div>
        </div>
        </Card>
        <Card theme={theme}>
          <h2>Twitter</h2>
          <div style={{width: 360, alignSelf: 'center'}}>
          <TwitterTimeline />
        </div>
        </Card>
      </div>
    )
  }
}

export default Home;
