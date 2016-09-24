/**
 * Created by KG on 9/9/16.
 */
import React from "react"

export default class LogoButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    create = () => {
      twttr.widgets.load();
      twttr.widgets.createTimeline({
        sourceType: "list",
        ownerScreenName: "__kenny_g_)",
        slug: "national-parks"
      }, document.getElementById("container"))

    }

    componentDidMount() {
      this.create();
      // this.interval = setInterval(twttr.widgets.load, 10000);
    }

    render() {
        return (
            <div>
                <a className="twitter-timeline" href="https://twitter.com/RedditAlpha/lists/reddit-alpha" width="300" height="400">
            Tweets from https://twitter.com/twitter/lists/official-twitter-accts
                 </a>
            </div>
        )
    }
}


