import React from "react";

import Deck from './Deck';


class DeckList extends React.Component {
  render() {
    return (
      <div style={{display:'inline-block'}}>
        { this.props.decks.map(function(deck){
            return (
                <div key={deck.id}>
                    <button type="button">Upvote</button>
                    <button type="button">Downvote</button>
                    <button type="button">Copy</button>
                    <button type="button">Star</button>
                    <Deck cards={deck.cards} />
                </div>
            );
        })}
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