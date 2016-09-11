import React from "react";

import TwitterTimeline from './TwitterTimeline';
import AutoComplete from './AutoComplete'

class Home extends React.Component {
  style = {
  }

  render() {
    return (
      <div style={{maxWidth:360}}>
        <AutoComplete />
        <TwitterTimeline />
        <h1>Welcome to Reddit Alpha</h1>
        <h5>Links</h5>
      </div>
    )
  }
}

export default Home;
