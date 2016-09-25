import React from "react";
import { render } from "react-dom";
import {Link, browserHistory} from "react-router";
import Input from 'react-toolbox/lib/input';
import CardPicker from './CardPicker';
import Loading from './Loading';

class DeckBuilder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [],
      selectedCards: 0,
      submitting: false,
      tags: [],
      notes: ''
    }
  }

  loadCards = () => {
    var request = $.ajax({
      url: '/api/cards/',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        cards: data.cards.map((card) => {
          card.selected = false;
          return card;
        })
      });
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error loading cards from api');
    });
  }

  addTag = (tag) => {
    if (this.state.tags.indexOf(tag) >= 0){
      return false
    } else {
      this.setState({
        tags: this.state.tags.concat(tag)
      });
      return true;
    }
  }

  deleteTag = (tag) => {
    this.setState({
      tags: this.state.tags.filter((item) => {return item != tag})
    });
  }

  clearCards = () => {
    this.setState({
      'cards': this.state.cards.map((card) => {
        card.selected = false;
        return card;
      }),
      'selectedCards': 0,
    });
  }

  saveDeck = () => {
    if (this.state.selectedCards != 8){
      return;
    }

    let fd = new FormData();

    this.state.cards.map((card) =>{
      if (card.selected){
        fd.append('cards', card.id);
      }
    });

    this.state.tags.map((tag) => {
      fd.append('tags', tag);
    });

    fd.append('notes', this.state.notes);

    this.setState({
      'submitting': true
    });

    var request = $.ajax({
      url: '/api/decks/mine',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false   // tell jQuery not to set contentType
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      setTimeout(()=>{
        self.setState({'submitting': false});
        browserHistory.push('/decklist');
      }, 2000);
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
      setTimeout(()=>{
        self.setState({'submitting': false});
        browserHistory.push('/decklist');
      }, 2000);
    });
  }

  click = (id) => {
    // if we're trying to select a card but there are already 8 selected,
    // just return and do nothing. don't update states.
    let card = this.state.cards.filter((card) => {return card.id == id})[0];

    if (card.selected == false && this.state.selectedCards == 8){
      return;
    }

    // else, carry on as usual
    this.setState({
      'cards': this.state.cards.map((item) => {
        if (item.id == card.id){
          item.selected = !item.selected;
        }
        return item;
      })
    });

    this.setState({
      'selectedCards': this.state.cards.filter((item) => {return item.selected;}).length
    })
  }

  componentDidMount() {
    this.loadCards();
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <h1 style={{textAlign:'center'}}>Deck Builder</h1>

        <Loading active={this.state.submitting}/>

        <CardPicker
          cards={this.state.cards}
          selectedCards={this.state.selectedCards}
          submitting={this.state.submitting}
          saveHandler={this.saveDeck}
          clearHandler={this.clearCards}
          clickHandler={this.click}
          tags={this.state.tags}
          addTagHandler={this.addTag}
          deleteTagHandler={this.deleteTag}
        />
      </div>
    )
  }
}

export default DeckBuilder;
