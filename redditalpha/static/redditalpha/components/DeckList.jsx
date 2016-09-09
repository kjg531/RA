import React from "react";
import Deck from './Deck';
import {Button, IconButton} from 'react-toolbox/lib/button';


class DeckList extends React.Component {
  render() {
    return (
      <div style={{display:'inline-block'}}>
        { this.props.decks.map((deck) => {
            return (
                <div key={deck.id}>
                    <div style={{display:'block'}}>
                      <Button icon='chevron_left' floating accent mini />
                      <Button icon='content_copy' onClick={this.props.copyHandler.bind(this, deck.id)} disabled={deck.have_it ? true:false} floating accent mini />
                    </div>

                    <div style={{display:'block'}}>
                      <Button icon='chevron_right' floating mini />
                      <IconButton icon='favorite_border' onClick={this.props.favoriteHandler.bind(this, deck.id)} accent />
                    </div>

                    <div style={{display:'inline-block'}}>
                      <Deck cards={deck.cards} />
                    </div>
                </div>
            );
        })}
      </div>
    )
  }
}

DeckList.propTypes = {
  decks: React.PropTypes.array.isRequired,
  copyHandler: React.PropTypes.func.isRequired
};

DeckList.defaultProps = { 
  decks: [],
  copyHandler: function(){}
};

export default DeckList;