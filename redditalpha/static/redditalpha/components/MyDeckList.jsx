import React from "react";
import {Button, IconButton} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import Dialog from 'react-toolbox/lib/dialog';

import { Link } from 'react-router'

import Deck from './Deck';


class MyDeckList extends React.Component {
  constructor(props) {
    super(props)
    this.style = {
      deckHidden: {display: 'none'},
      toolboxInvisible: {opacity: 0, marginLeft:50},
      toolboxVisible: {opacity: 1, marginLeft:50}
    };
    this.state = {
      'dialogOpen': false,
      'deleteTarget': null,
      'visibleToolboxes': []
    };
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

  openDialog = (deckId) => {
    this.setState({
      deleteTarget: deckId, 
      dialogOpen: true
    });
  }

  closeDialog = () => {
    this.setState({
      deleteTarget: null,
      dialogOpen: false
    });
  }

  deleteConfirmed = () => {
    this.props.deleteHandler(this.state.deleteTarget);
    this.closeDialog();
  }

  toggleToolbox = (deckId) => {
    if (this.state.visibleToolboxes.indexOf(deckId) >= 0){
      this.setState({visibleToolboxes: this.state.visibleToolboxes.filter((id) => (id != deckId))});
    }else{
      this.setState({visibleToolboxes: this.state.visibleToolboxes.concat(deckId)});
    }
  }

  render() {
    let actions = [
      { label: "Yes", onClick: this.deleteConfirmed },
      { label: "No", onClick: this.closeDialog}
    ];

    return (
      <div style={{display:'inline-block'}}>
        { this.props.decks.map((deck) => {
          return (
            <div key={deck.id} style={this.isHidden(deck) ? this.style.deckHidden:{}}>
              <div style={this.state.visibleToolboxes.indexOf(deck.id) < 0 ? this.style.toolboxInvisible : this.style.toolboxVisible}>
                <IconButton onMouseUp={this.props.favoriteHandler.bind(this, deck.id)} icon={deck.favorite ? 'favorite':'favorite_border'} />
                <IconButton onMouseUp={this.openDialog.bind(this, deck.id)} icon='delete' floating mini />
                <Link to={"/decklist/" + deck.id} activeClassName="active"><IconButton icon='note_add' floating mini /></Link>
                <span>{deck.tags.map((tag) => <Chip>{tag}</Chip>)}</span>
              </div>

              <IconButton onMouseUp={this.toggleToolbox.bind(this, deck.id)} icon='expand_less' style={{bottom: 35}}/>
              <div style={{display:"inline-block"}}>
                <Deck cards={deck.cards} />
              </div>
            </div>
          );
        })}

        <Dialog
          actions={actions}
          active={this.state.dialogOpen}
          onEscKeyDown={this.closeDialog}
          onOverlayClick={this.closeDialog}
          title='Delete this deck?'>
        </Dialog>
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
