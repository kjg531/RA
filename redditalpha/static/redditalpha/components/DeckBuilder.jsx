import React from "react";
import { render } from "react-dom";
import {Link} from "react-router";

import CardPicker from './CardPicker';
import NavBar from './NavBar';

class DeckBuilder extends React.Component {
  style = {
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <h1>Deck Builder</h1>
        <CardPicker cards={this.props.cards} />
      </div>
    )
  }
}

DeckBuilder.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

DeckBuilder.defaultProps = { 
  cards: DJ.BACKEND_CARDS
};

export default DeckBuilder;