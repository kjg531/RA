import React from "react"
import { render } from "react-dom"
import CardList from './CardList';

class DeckBuilder extends React.Component {
  style = {
  }

  render() {
    return (
      <CardList cards={this.props.cards} />
    )
  }
}

DeckBuilder.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

export default DeckBuilder;