import React from "react"
import { render } from "react-dom"
import CardPicker from './CardPicker';

class DeckBuilder extends React.Component {
  style = {
  }

  render() {
    return (
      <CardPicker cards={this.props.cards} />
    )
  }
}

DeckBuilder.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

export default DeckBuilder;