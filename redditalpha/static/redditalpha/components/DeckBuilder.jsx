import React from "react";
import { render } from "react-dom";
import {Link} from "react-router";

import CardPicker from './CardPicker';


class DeckBuilder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'cards': [],
      'selectedCards': 0,
      'submitting': false
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

  clear = () => {
    this.setState({
      'cards': this.state.cards.map((card) => {
        card.selected = false;
        return card;
      }),
      'selectedCards': 0,
    });
  }

  save = () => {
    let fd = new FormData();

    this.state.cards.map(function(card, index){
      if (card.selected){
        fd.append('cards', card.id);
      }
    });

    this.setState({
      'submitting': true
    });

    var request = $.ajax({
      url: '/api/decks/mine',
      method: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      type: "POST",
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false   // tell jQuery not to set contentType
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      alert(data.status);
      self.setState({
        'submitting': false
      });
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
      alert('Error: ' + jqXHR.responseJSON.cards[0]);
      self.setState({
        'submitting': false
      });
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
        <h3>There are {this.state.cards.length} cards to choose from</h3>
        <CardPicker
          cards={this.state.cards}
          selectedCards={this.state.selectedCards}
          submitting={this.state.submitting}
          saveHandler={this.save}
          clearHandler={this.clear}
          clickHandler={this.click}
        />
      </div>
    )
  }
}

export default DeckBuilder;
