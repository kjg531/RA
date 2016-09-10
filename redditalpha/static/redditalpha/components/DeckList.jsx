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
                      <Button icon='chevron_left' floating mini onClick={this.props.upvoteHandler.bind(this, deck.id)} accent={deck.vote_status == 1 ? true:false} />
                      <Button icon='content_copy' onClick={this.props.copyHandler.bind(this, deck.id)} disabled={deck.have_it ? true:false} floating accent mini />
                    </div>

                    <div style={{display:'block'}}>
                      <Button icon='chevron_right' floating mini onClick={this.props.downvoteHandler.bind(this, deck.id)} accent={deck.vote_status == -1 ? true:false} />
                      <IconButton icon={deck.favorite? 'favorite':'favorite_border'} onClick={this.props.favoriteHandler.bind(this, deck.id)} accent />
                    </div>
                    <h5>Votes: {deck.vote_sum}</h5>
                    <h5>Favorites: {deck.favorite_sum}</h5>
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
  copyHandler: React.PropTypes.func.isRequired,
  upvoteHandler: React.PropTypes.func.isRequired,  
  downvoteHandler: React.PropTypes.func.isRequired,  
  favoriteHandler: React.PropTypes.func.isRequired,    
};


export default DeckList;