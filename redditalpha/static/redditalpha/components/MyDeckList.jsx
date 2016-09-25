import React from "react";
import {Button, IconButton} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import { Link } from 'react-router'

import Deck from './Deck';


class MyDeckList extends React.Component {
  constructor(props) {
    super(props)
    this.style = {
      hidden: {display: 'none'}
    }
  }

  isHidden = (deck) => {
    const {tagFilters} = this.props;
    
    if (deck.tags.length == 0 && tagFilters.indexOf('untagged') >= 0){
      return false;
    }else{
      for (var i = 0; i < deck.tags.length; i++){
        if (tagFilters.indexOf(deck.tags[i]) >= 0){
          return false;
        }
      }
      return true;
    }
  }

  render() {
    return (
      <div style={{display:'inline-block'}}>
        { this.props.decks.map((deck) => {
          return (
            <div key={deck.id} style={this.isHidden(deck) ? this.style.hidden:{}}>
              <IconButton onMouseUp={this.props.favoriteHandler.bind(this, deck.id)} icon={deck.favorite ? 'favorite':'favorite_border'} accent />
              <Button onMouseUp={this.props.deleteHandler.bind(this, deck.id)} icon='delete' floating mini />
              <span>{deck.tags.map((tag) => <Chip>{tag}</Chip>)}</span>
              <Deck cards={deck.cards} />
              <Link to={"/decklist/" + deck.id} activeClassName="active"><Button icon='add' floating accent mini /></Link>
            </div>
          );
        })}
      </div> 
    )
  }
}

MyDeckList.propTypes = {
  decks: React.PropTypes.array.isRequired,
  tagFilters: React.PropTypes.array.isRequired,
  favoriteHandler: React.PropTypes.func.isRequired,
  deleteHandler: React.PropTypes.func.isRequired,
};

export default MyDeckList;