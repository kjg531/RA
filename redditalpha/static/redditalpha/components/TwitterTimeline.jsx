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

    componentDidMount() {
        twttr.widgets.load();
        twttr.widgets.createTimeline({
        sourceType: "list",
        ownerScreenName: "__kenny_g_)",
        slug: "national-parks"
      }, document.getElementById("container"));


        this.interval = setInterval(twttr.widgets.load(), 1000);
}

    render() {
        return (
            <div>
                <a className="twitter-timeline" href="https://twitter.com/__Kenny_G_/lists/poker">
            Tweets from https://twitter.com/twitter/lists/official-twitter-accts
                 </a>
            </div>
        )
    }
}
