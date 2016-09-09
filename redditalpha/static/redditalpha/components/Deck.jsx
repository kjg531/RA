import React from "react";

import Card from './Card';


class Deck extends React.Component {
  style = {

  }
  render() {
    return (
      <div>
        {this.props.cards.map(function(card, i){
          return <Card key={card.id} data={card} />;
        })}
      </div>
    )
  }
}

Deck.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

Deck.defaultProps = {
  cards: []
};

export default Deck;
