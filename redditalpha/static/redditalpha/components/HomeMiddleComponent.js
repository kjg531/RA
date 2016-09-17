/**
 * Created by KG on 9/13/16.
 */
import React from "react";
import { Card} from 'react-toolbox/lib/card';
import theme from './HomeMiddleComponent.scss'


class Home extends React.Component {

  render() {
    return (
      <div style={{display: 'flex'}}>
        <Card theme={theme} style={{marginRight:20}}>
          <h2>Discord Servers</h2>
          <iframe style={{alignSelf: 'center', paddingBottom: 20}} src="https://discordapp.com/widget?id=218534373169954816&theme=dark" width="300" height="400" allowtransparency="true" frameborder="0"></iframe>
        </Card>
        <Card theme={theme} style={{marginRight: 20}}>
          <h2> Twitch Streams</h2>
          <a href="http://twitch.tv/wwoody123"><img src="http://streambadge.com/twitch/dark/wwoody123.png" width="300" height="64" alt="wwoody123's Streambadge"></img></a>
          <a href="http://twitch.tv/wwoody123"><img src="http://streambadge.com/twitch/dark/darthjarjarcr.png" width="300" height="64" alt="wwoody123's Streambadge"></img></a>
          <a href="http://twitch.tv/wwoody123"><img src="http://streambadge.com/twitch/dark/oden11.png" width="300" height="64" alt="wwoody123's Streambadge"></img></a>
        </Card>
        <Card theme={theme}>
          <h2>Coaching</h2>
        </Card>
      </div>
    )
  }
}

export default Home;
