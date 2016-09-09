import React from "react";
import { render } from "react-dom";

import DeckList from './DeckList';


class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'decks': []
    };
  }

  loadDecks = () => {
    var request = $.ajax({
      url: '/api/decks/',
      type: 'GET'
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      self.setState({
        decks: data.decks
      });
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Error loading decks from api');
    });
  }

  componentDidMount() {
    this.loadDecks();
  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <h1>This is the deck index!</h1>
        <DeckList decks={this.state.decks}/>
      </div>
    )
  }
}

Decks.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

Decks.defaultProps = { 
  cards: DJ.BACKEND_CARDS
};

export default Decks;
