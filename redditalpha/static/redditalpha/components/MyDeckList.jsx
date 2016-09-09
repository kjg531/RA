import React from "react";
import {Button, IconButton} from 'react-toolbox/lib/button';

import Deck from './Deck';


class MyDeckList extends React.Component {
  render() {
    return (
      <div style={{display:'inline-block'}}>
        { this.props.decks.map((deck) => {
          return (
            <div key={deck.id}>
              <IconButton icon='favorite' accent />
              <Button type="button" onClick={this.props.deleteHandler.bind(this, deck.id)}>Delete</Button>
              <Button type="button">Edit</Button>
              <Deck cards={deck.cards} />
            </div>
          );
        })}
      </div>
    )
  }
}

MyDeckList.propTypes = {
  decks: React.PropTypes.array.isRequired,
};

MyDeckList.defaultProps = { 
  decks: []
};

export default MyDeckList;