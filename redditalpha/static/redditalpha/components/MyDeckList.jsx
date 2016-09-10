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
              <IconButton onMouseUp={this.props.favoriteHandler.bind(this, deck.id)} icon={deck.favorite ? 'favorite':'favorite_border'} accent />
              <Button onMouseUp={this.props.deleteHandler.bind(this, deck.id)} icon='delete' floating mini />
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
  favoriteHandler: React.PropTypes.func.isRequired,
  deleteHandler: React.PropTypes.func.isRequired,
};

export default MyDeckList;