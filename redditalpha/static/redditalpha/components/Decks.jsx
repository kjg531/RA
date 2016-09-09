import React from "react";
import { render } from "react-dom";

import MyDeckList from './MyDeckList';


class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'decks': []
    };
  }

  loadDecks = () => {
    var request = $.ajax({
      url: '/api/decks/mine',
      type: 'GET'
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      self.setState({
        decks: data.decks
      });
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Error loading decks from api');
    });
  }

  deleteDeck = (id) => {
    var request = $.ajax({
      url: '/api/decks/' + id + '/delete' ,
      type: 'DELETE',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      self.setState({
        'decks': self.state.decks.filter((deck) => {
          return deck.id != id;
        })
      });
    });
     
    request.fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Delete deck ' + id + ' failed!');
    });
  }

  componentDidMount() {
    this.loadDecks();
  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <h1>These are your decks</h1>
        <MyDeckList decks={this.state.decks} deleteHandler={this.deleteDeck}/>
      </div>
    )
  }
}

Decks.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

Decks.defaultProps = { 
  cards: DJ.BACKEND_CARDS
};

export default Decks;
