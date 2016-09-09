import React from "react";

import Card from './Card';


class Deck extends React.Component {
  style = {

  }
  render() {
    return (
      <div style={{padding:5, backgroundColor: 'black', margin: 10}}>
        {this.props.cards.map(function(card, i){
          return <Card data={card} />;
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