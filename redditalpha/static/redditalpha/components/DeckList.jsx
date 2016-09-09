import React from "react";

import Deck from './Deck';


class DeckList extends React.Component {
  render() {
    return (
      <div>
        { this.props.decks.map(function(deck, i){return <Deck cards={deck.cards} />;})}
      </div>
    )
  }
}

DeckList.propTypes = {
  decks: React.PropTypes.array.isRequired,
};

DeckList.defaultProps = { 
  decks: []
};

export default DeckList;