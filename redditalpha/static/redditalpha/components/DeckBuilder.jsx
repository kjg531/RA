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
        <NavBar/>
        <h1>Deck Builder</h1>
        <h5>Links</h5>
        <Link to="about">About</Link>
        <CardPicker cards={BACKEND_CARDS} />
      </div>
    )
  }
}

DeckBuilder.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

export default DeckBuilder;